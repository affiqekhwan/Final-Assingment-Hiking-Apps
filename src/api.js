let weather = {
    apiKey: "658767b0ae936b022f59a69f44868419",
    fetchWeather: function (city) {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=658767b0ae936b022f59a69f44868419&units=metric` +
          city +
          "&units=metric&appid=" +
          this.apiKey
      )
        .then((response) => {
          if (!response.ok) {
            alert("No weather found.");
            throw new Error("No Hill found.");
          }
          return response.json();
        })
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function (data) {
      const { name } = data;
      const { icon, description } = data.weather[0];
      const { temp, humidity } = data.main;
      const { lon, lat } = data.coord;
      document.querySelector(".city").innerText = "Weather in " + name;
      document.querySelector(".icon").src ="https://openweathermap.org/img/wn/" + icon + ".png";
      document.querySelector(".description").innerText = description;
      document.querySelector(".temp").innerText = temp + "°C";
      document.querySelector(".humidity").innerText ="Humidity: " + humidity + "%";
      document.querySelector(".latitude").innerText ="Latitude: " + lat;
      document.querySelector(".longitude").innerText ="Longitude: " + lon;
      document.querySelector(".weather").classList.remove("loading");
      document.body.style.backgroundImage ="url('https://source.unsplash.com/1600x900/?" + name + "')";
    },
    search: function () {
      this.fetchWeather(document.querySelector(".search-bar").value);
    },
  };
  
  document.querySelector(".search button").addEventListener("click", function () {
    weather.search();
  });
  
  document.querySelector(".search-bar")
.addEventListener("keyup", function (event) {
      if (event.key == "Enter") {
        weather.search();
      }
    });
  
  weather.fetchWeather("Tokyo");