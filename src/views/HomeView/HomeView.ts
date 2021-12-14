import Vue from 'vue';
import Component from 'vue-class-component';
import axios from 'axios';
import dayjs from 'dayjs';
// import VueLoadImage from 'vue-load-image';

@Component({
    /*components: {
        'vue-load-image': VueLoadImage
    }*/
})

export default class HomeView extends Vue {

    // *** Component DATA
    public currentDate = dayjs().format('dddd, MMMM D, YYYY h:mm A');
    public errorMessage = '';
    public gettingLocation = false;
    public location: GeolocationCoordinates = {};
    public apiCallError: Record<any, unknown> = {};

    public latitude = null;
    public longitude = null;

    private baseUrl = 'https://api.openweathermap.org/data/2.5/onecall?';
    private exclude = '&exclude=minutely,hourly,alerts';
    private units = '&units=metric';
    public day = {
        date: null,
        condition: '',
        tempNow: null,
        TempDay: null,
        minTemp: null,
        maxTemp: null,
        icon: null,
    };
    public week: Record<any, any> = [];
    private apiKey = 'appid=d1e902b667baccdb37cfbc96ad629f00';

    // *** Component CREATED lifecycle hook
    created(): void {

        // Check if we support geolocation
        if ( !('geolocation' in navigator) ) {
            this.errorMessage = 'Geolocation is not available.';
            return;
        }

        this.gettingLocation = true;
        // Get our current position
        navigator.geolocation.getCurrentPosition(position => {
            this.gettingLocation = false;
            this.location = position;
            this.latitude = position.coords.latitude;
            this.longitude = position.coords.longitude;
            console.log(this.location); // todo: remove debug code

            this.makeWeatherApiCall();

        }, error => {
            this.gettingLocation = false;
            this.errorMessage = error.message;

        });

    }

    // *** Component MOUNTED lifecycle hook
    mounted(): void {
        //
    }

    // *** Component METHODS
    makeWeatherApiCall(): void {
        const qLat = '&lat=' + this.latitude;
        const qLon = '&lon=' + this.longitude;
        const apiUrl = this.baseUrl + this.apiKey + qLat + qLon + this.exclude + this.units;

        axios.get(apiUrl)
            .then((response) => {
                Object.assign(this.day, {
                    condition: response.data.current.weather[ 0 ].description,
                    tempNow: Math.round(response.data.current.temp),
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

}