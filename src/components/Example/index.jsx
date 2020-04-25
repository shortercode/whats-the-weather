import React, { Component } from "react";
import logo from "./logo.png";
import './Example.css';

// An example component
export default class Example extends Component {
  render() {
    return (<div className='app-header-container'>
        <img src={logo} className="app-logo" alt="logo" />
        <div>
          <section>
            <h4>THE TASK (Required): What's your weather</h4>
            <p>
              Using the OpenWeatherMap API fetch the current weather for a given location and refresh every minute.
            </p>
          </section>
          <hr/>
          <section>
            <h4>CHALLENGE (Optional): Express your creativity</h4>
            <p>
              Store and display a <em>list</em> of the 5 most recently fetched locations and make them easily
              accessible to the user.
            </p>
          </section>
          <hr/>
          <section>
            <h4>INFO: Fetching data</h4>
            <p>Use the fetch API to return the weather you require:</p>
            <pre className="app-header-code">
              {"fetch('https://api.openweathermap.org/data/2.5/weather',\n" +
                "  { \n" +
                "     body: JSON.stringify({ \n" +
                "       appid: <Your API KEY>, \n" +
                "       q: <LOCATION PROVIDED> \n" +
                "     }) \n" +
                "  })\n" +
                "  .then(function(response) {\n" +
                "    return response.json();\n" +
                "  })\n" +
                "  .then(function(myJson) {\n" +
                "    console.log(JSON.stringify(myJson));\n" +
                "});\n"}
            </pre>
          </section>
        </div>
    </div>);
  }
}
