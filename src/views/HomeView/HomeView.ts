import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';

@Component
export default class HomeView extends Vue {

    // *** Component data
    public errorMessage = '';
    public gettingLocation = false;
    public location: Record<any, unknown> = {};
    public apiCallError: Record<any, unknown> = {};

    public latitude = null;
    public longitude = null;

    private baseUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
    private exclude = '&exclude=minutely,hourly,alerts';
    private units = '&units=metric';
    public todays = {
        date: null,
        condition: '',
        nowTemp: null,
        dayTemp: null,
        minTemp: null,
        maxTemp: null,
        icon: null,
    };
    public week: Record<any, any> = [];
    private apiKey = 'appid=d1e902b667baccdb37cfbc96ad629f00';

    // *** Component CREATED lifecycle hook
    created(): void {

        // First check if we support geolocation
        if ( !('geolocation' in navigator) ) {
            this.errorMessage = 'Geolocation is not available.';
            return;
        }

        this.gettingLocation = true;
        // Get position
        navigator.geolocation.getCurrentPosition(position => {
            this.gettingLocation = false;
            this.location = position;
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            console.log(this.location); // todo: remove debug code

        }, error => {
            this.gettingLocation = false;
            this.errorMessage = error.message;

        });

    }

    // *** Component MOUNTED lifecycle hook
    mounted() {
        this.getWeather();
    }

    // *** Component methods
    getWeather() {
        const qLat = '&lat=' + this.latitude;
        const qLon = '&lon=' + this.longitude;
        const apiUrl = this.baseUrl + this.apiKey + qLat + qLon + this.exclude + this.units;

        axios.get(apiUrl)
            .then((response) => {
                console.log(response);
                Object.assign(this.todays, {
                    condition: response.data.current.weather[ 0 ].description,
                    nowTemp: Math.round(response.data.current.temp),
                    minTemp: Math.round(response.data.daily[ 0 ].temp.min),
                    maxTemp: Math.round(response.data.daily[ 0 ].temp.max),
                    icon: './img/' + response.data.current.weather[ 0 ].icon + '.png',
                });

                this.week = response.data.daily.splice(1, 7).map((item: any) => {
                    return {
                        ...item,
                        icon: `./img/${item.weather[ 0 ].icon}.png`,
                    };
                });

                console.log(this.week);
            }).catch(error => {
            this.apiCallError = error.response.data;
            console.log(this.apiCallError);
        });

    }

    formatDate(dt: number): string {
        const unformattedDate = new Date(dt * 1000);
        return unformattedDate.toLocaleDateString('nl-NL', { weekday: 'long', month: 'long', day: 'numeric' });
    }

}