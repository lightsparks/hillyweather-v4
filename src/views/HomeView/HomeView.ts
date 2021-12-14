import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';

@Component
export default class HomeView extends Vue {

    // *** Component data
    public errorMessage = '';
    public gettingLocation = false;
    public location = null;
    public locationChecked = false;

    private baseUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
    private exclude = '&exclude=minutely,hourly,alerts';
    private units = '&units=metric';
    private apiKey = '&appid=d1e902b667baccdb37cfbc96ad629f00';

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
            console.log(position);

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
        axios.get(this.apiUrl)
            .then((response) => {
                console.log(this.apiResponse);
                Object.assign(this.today, {
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