import React from 'react';
import moment from 'moment';
import { weather, Forecast, ForecastResponse } from './weatherapi';

interface WeatherUIProps {
  city: string;
}

interface WeatherUIState {
  forecast: ForecastResponse;
}

class WeatherUI extends React.Component<WeatherUIProps, WeatherUIState> {
  constructor(props: WeatherUIProps) {
    super(props);
    const emptyResponse: ForecastResponse = {
      cod: '404',
      message: 200,
      cnt: 0,
      list: [],
      city: {
        id: 0,
        name: '',
        coord: {
          lat: 0,
          lon: 0,
        },
        country: 'UK',
        population: 0,
        timezone: 0,
        sunrise: 0,
        sunset: 0,
      },
    };
    this.state = {
      forecast: emptyResponse,
    };
  }

  public componentDidMount(): void {
    const self = this;
    const { city } = this.props;
    weather(city).then((forecast) => {
      console.log(forecast);
      self.setState({
        forecast,
      });
    });
  }

  private static renderTime(unixTime: number): string {
    return moment.unix(unixTime).format('D MMM ha');
  }

  private static renderForecast(forecast: Forecast): JSX.Element {
    return (
      <div className="col mb-4" key={forecast.dt}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{WeatherUI.renderTime(forecast.dt)}</h5>
            <h6 className="card-subtitle mb-2 text-muted">
              {Math.floor(forecast.main.temp)}°{' '}
              {forecast.weather[0].description}
            </h6>
            <dl className="row">
              <dt className="col-sm-5">Feels like</dt>
              <dd className="col-sm-7">
                {Math.floor(forecast.main.feels_like)}°
              </dd>
              <dt className="col-sm-5">Wind</dt>
              <dd className="col-sm-7">{forecast.wind.speed}mph</dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }

  public render(): JSX.Element {
    return (
      <div>
        <h3>Forecast for {this.state.forecast.city.name}</h3>
        <div>
          {this.state.forecast.list.map((w) => WeatherUI.renderForecast(w))}
        </div>
      </div>
    );
  }
}

export default WeatherUI;
