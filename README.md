# Template:

This is a template of a react frontend from the course ASP.NET 2 at Nackademin.

The documentation below was written by me for the assignment in that course. 

Check here for more: https://github.com/AspnetGroupOne/Frontend


## Installation:

To clone the repo:
```bash
git clone https://github.com/AspnetGroupOne/Frontend.git
cd Frontend
npm install
```
To run locally: 
```bash
npm run dev
```

## Static web app:

There are some issues that arise when deploying an static web app on azure which we did with this project.

### The first issue:

The reason it is need is simply because react apps are single page applications that use client side routing. (React router)
When refreshing or navigating directly to a nested route, the default behaviour of static web apps is to look for a file or folder at that path. Without a config file it won't find one and will return 404 not found.

You create the staticwebapp.config.json file to show how to handle incoming requests. You set up a fallback route that serves index.html which is your SPAs entry point. And add 

The location of where to put the file can differ on whether you initialized your project with vite or create-react-app. In our case, with vite, we created the file in the public folder and gave it the content:

```json
{
  "navigationFallback": {
    "rewrite": "/index.html",
    "exclude": [
      "/assets/*",
      "/favicon.ico",
      "/robots.txt",
      "/manifest.webmanifest",
      "/apple-touch-icon.png",
      "/vite.svg",
      "/images/*",
      "/images/error_images/*",
      "/images/event_card_images/*",
      "/images/paid_status_icons/*",
      "/images/rules-icons/*",
      "/images/sidebar-images/*",
      "/images/SocialMedia-icons/*"
    ]
  }
}
```

***Source:*** https://learn.microsoft.com/en-us/azure/static-web-apps/configuration

***Chatgpt:*** Was shown our folder structure and helped with creating our config files content. 

### The second issue:

The other issue is after having deployed the static web app. 

There is a file which is created in which we need to change a single word from "build" to "dist" to make it work. The reason for this is once again because we used vite. 

You find the file:

<img src="https://github.com/user-attachments/assets/1e8d33ca-91be-41e6-a183-751e7fc1343a" height="100">

And scroll down to:

```yml
output_location: "dist" # Built app content directory - optional
```

When having just deployed the web app, it says "build" and it simply needs to be changed to "dist" and your static web app should soon be up and running. Again, this is because we used vite. If you're using create-react-app then the word "build" might be the correct word. 

## Safekeeping APIs with a .env file: 

The use of a .env file was implemented near the end of the assignment for handling some API-urls and API-keys. It was added to the gitignore to keep it from ending up on GitHub.

```env
# Event Terms Service
VITE_EVENT_TERMS_SERVICE_URL=https://exampleUrl.azurewebsites.net
VITE_EVENT_TERMS_SERVICE_API_KEY=exampleKey-APINYCKEL
```

And a serviceConfig.jsx file was created, in the utils folder, for easy exporting of the urls and keys.

```jsx
export const EVENT_TERMS_SERVICE = {
  URL: import.meta.env.VITE_EVENT_TERMS_SERVICE_URL,
  API_KEY: import.meta.env.VITE_EVENT_TERMS_SERVICE_API_KEY,
};
```

And then importing and using the url and API-key.

```jsx
import { EVENT_TERMS_SERVICE } from '../../utils/serviceConfig';

const res = await fetch(
  `${EVENT_TERMS_SERVICE.URL}/api/Terms/${id}`,
    {
      headers: {
        'X-API-KEY': EVENT_TERMS_SERVICE.API_KEY,
        'Content-Type': 'application/json'
      }
    }
  );
```
