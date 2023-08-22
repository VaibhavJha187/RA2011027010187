import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  sort(trains)
  {
    const currentTime = new Date();
    const currentTimeInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes();

    const filteredTrains = trains.filter(train => {
      const departureTimeInMinutes = train.departureTime.Hours * 60 + train.departureTime.Minutes;
      return departureTimeInMinutes >= currentTimeInMinutes + 30;
    });

    const sortedTrains = filteredTrains.slice().sort((a, b) => {
      // Compare by ascending price
      const priceComparison = a.price.sleeper - b.price.sleeper;
      
      // If prices are equal, compare by descending departure time
      if (priceComparison === 0) {
        const departureTimeA = a.departureTime.Hours * 60 + a.departureTime.Minutes;
        const departureTimeB = b.departureTime.Hours * 60 + b.departureTime.Minutes;
        return departureTimeB - departureTimeA;
      }
      
      return priceComparison;
    });

    return sortedTrains;

  }
  async getHello(){
    const data = {
      "companyName": "Train Central",
      "clientID": "19f1e3f6-0e01-47f3-8bb3-43489b45dce0",
      "clientSecret": "GEmMnhtVqIWhsYkM",
      "ownerName": "Vaibhav Jha",
      "ownerEmail": "vj2573@srmist.edu.in",
      "rollNo": "RA2011027010187"
    }
    var res = await fetch('http://20.244.56.144/train/auth', {method:'POST', body: JSON.stringify(data)});
    res = (await res.json()).access_token;
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${res}`);
    var ans = await fetch("http://20.244.56.144/train/trains", {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    });
    ans = await ans.json();
    return this.sort(ans);
  }
}
