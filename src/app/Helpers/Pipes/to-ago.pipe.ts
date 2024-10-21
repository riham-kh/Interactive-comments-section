import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toAgo',
  standalone: true
})
export class ToAgoPipe implements PipeTransform {

  transform(time: string): string {
    // createdAt in ms
    let createdAt = new Date(time);

    // createdAt in sec
    let seconds = (new Date().getTime() - createdAt.getTime()) / 1000;
    let ago = "";

    // with less than 1 minute return 1m
    if (seconds < 60) {
      ago = "1 sec ago";

      // with less than 1 hour return mins
    } else if (seconds < 3600 && seconds > 60) {
      ago = Math.floor(seconds / 60) + " min ago";

      // with less than 1 day return hour 
    } else if (seconds < 86400 && seconds > 3600) {
      ago = Math.floor(seconds / 3600) + " hour ago";
    }

    // with less than 1 week  return day
    else if (seconds < 604800 && seconds > 86400) {
      ago = Math.floor(seconds / 86400) + " day ago";
    }

    // with less than 1 month return weeks
    else if (seconds < 2419200 && seconds > 604800) {
      ago = Math.floor(seconds / 604800) + " weeks ago";
    }

    // with less than 1 year return month
    else if (seconds < 31104000 && seconds > 2419200) {
      ago = Math.floor(seconds / 2419200) + " month ago";
    }

    // with more than 1 year return year
    else {
      ago = Math.floor(seconds / 3.154e7) + " year ago";
    }

    return ago;
  }

}
