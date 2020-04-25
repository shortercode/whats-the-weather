Metrichor Challenge
=================

The purpose of this exercise is to create a live weather report for a given location.

What you need to do
-------------------

1. Signup to [OpenWeatherMap](https://openweathermap.org) to get a free API key
    - You will need to use the [current](https://openweathermap.org/current) API call for this exercise
    - You can find an example of the JSON output in [src/data/weather.json](./src/data/weather.json) but you may not use this JSON in your implementation

2. Install and run the provided server

```
    npm install
    npm start
```

3. Prioritise and resolve the list of missing features that are required to build this application. These are (in no particular order):
    - Update any out of date packages
    - Fetch and display the weather for a user entered location (city name)
    - When a location is chosen, it should refresh the weather data every 1 minute
    - Count down how long since the last refresh and time to the next refresh
    - Toggle temperate between Kelvin and degrees Celsius
    - Track your changes using git
    - Make it so when the user queries another location, the previous one stays in a sidebar as a history (up to 5 locations)
    - Style the application as close to the spec as possible (see [src/data/spec.png](./src/data/spec.png))
    - Handle errors when an incorrect location is chosen
    - Write at least one test for your code

4. Write tests to test your code. An example can be found for each component in  `*.test.js` files. To run your tests:
  ```npm test```

5. *You should deliver your solution as a `git` repository, preferably hosted on GitHub.*

Things you should know
-------------------
1. For clues on how/where to get started search for `TODO` in the `src/` directory
2. You may NOT use css pre-processors such as sass/scss.
3. You will use React and JSX for DOM manipulation and the native fetch API for data fetching. Sample response data is provided in [src/data/weather.json](./src/data/weather.json). You can view this file but you can't change the data in it.
4. An example component has been provided to get you started, but feel free to restructure the project layout in any way that makes sense to you.
5. **NB: At a minimum**, you should produce an interface as close to that in [src/data/spec.png](./src/data/spec.png)
6. Please read familiarize yourself with our [disclaimer](./DISCLAIMER.md)

What we are looking for:
-------------------
1. Functionality (you write code that does what it's supposed to do)
2. Readability (you clean/lint your code)
3. Good code design (you demonstrate code re-use)
4. Best practice (you acknowledge established code conventions from the React community)

Libraries:
-------------------
You may not use any external libraries (Except for linters)
