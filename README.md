# Event Manager (Frontend)

This is the react frontend for the event management system currently in use at the [SummerTech](https://summertech.net/) coding camp.
## Features

- Viewer-mode to view the day's events on the TV
- Configuration files, to configure the
  - Counselor list, for the autofill feature
  - Common events list, for the autofill feature
  - Theme list, to configure the day's theme & background image
  - Times list, to configure the event times for the day
- Easy editing features so you can easily update events for any day Sunday through Friday
- Export JSON (Import feature is on the way)
- View as PDF for the week & day to allow for easy printing
- Login system to prevent unauthorized access


## Used By

This project is used by the following companies:

- [SummerTech](https://summertech.net)


## FAQ

#### Why won't this work on safari (computer version)?

Safari is very strict with cross-site cookies, and the backend and frontend are hosted seperately on different domains, so it will only work if you go to **Safari > Settings > Privacy > Prevent cross-site tracking**, and disable it. Please note this may have unintended side effects, so it is best to use another browser.

#### Why won't this work on mobile or another browser?

It is probably also a cross-site tracking issue or browser restrictions. It has only been tested/used on Google Chrome and Microsoft Edge on PC/Mac.

#### Why does it say the backend is offline, error 503?

If you are cloning this and hosting it, you must also host the backend. Please note this must be configured aswell, so please visit the [backend's github](https://github.com/charleywolf/event-manager-backend).

## Deployment

To deploy this project, run:

`npm run build`

Then, set the build directory of your project to `/build`.
## Environment Variables

To run this project, you will need to add the following environment variable to your .env file

`REACT_APP_BACKEND_ADDRESS`

This is the address for your [backend](https://github.com/charleywolf/event-manager-backend), which you also must run to use this. Make sure the link you use *does not end in a slash*, and you must include the https/http at the start.

## Configuration

To configure the project, head to the `/public/config` directory and edit the configurations to your choosing. Descriptions of each config file are below.

#### events.csv

A CSV file where you can insert commonly used events, each on a new line for the title autofill feature.

#### staff.csv

A CSV file where you can insert organizer/staff name's for the organizer autofill feature. Each name on a new line.

#### theme_image.json

Set the background image for each day, with the format being

```
"Monday": "https://img.com/image.png"`,
"Tuesday": null
```

You must include all the days (Mon-Sun) for it to work.

#### themes.json

Set the theme of each day, with the format:

```
"Tuesday": "Taco"
"Wednesday": "null"
```

This would display as Taco Tuesday on Tuesday, and just Wednesday on Wednesday. Once again, you must include all days (Mon-Sun) for it to work.

#### times.json

Set the available event times in the dropdown for each day. Format is below:

```
"Default": ["1:00 PM", "2:00 PM", "3:00 PM"]
"Sunday": ["9:00 AM", "10:00 AM", "11:00 AM"]
```

Default is the default time, and add a day's name for the exceptions (on Sunday the times will display differently in this example).

#### categories.json

Coming soon...
## Authors

 - [@charleywolf](https://github.com/charleywolf)
 - [@samsherman5](https://github.com/samsherman5)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
