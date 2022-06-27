import { VideoPlayer } from '../model/video-player';
import { VideoType } from './video-type';

export const getVideoId = (url: string): VideoPlayer => {
  const ytIdDigitsLength: number = 11;
  if (url.length == ytIdDigitsLength || url.includes('you')) {
    const youtubeRegex =
      /https?:\/\/(?:[0-9A-Z-]+\.)?(?:youtu\.be\/|youtube(?:-nocookie)?\.com\S*?[^\w\s-])([\w-]{11})(?=[^\w-]|$)(?![?=&+%\w.-]*(?:['"][^<>]*>|<\/a>))[?=&+%\w.-]*/gi;
    return {
      id: url.replace(youtubeRegex, `$1`),
      videoType: VideoType.YOUTUBE,
    };
  }
  {
    const vimeoRegex =
      /(?:http|https)?:?\/?\/?(?:www\.)?(?:player\.)?vimeo\.com\/(?:channels\/(?:\w+\/)?|groups\/(?:[^\/]*)\/videos\/|video\/|)(\d+)(?:|\/\?)/;
    return {
      id: url.length > 8 ? url.match(vimeoRegex)![1] : url,
      videoType: VideoType.VIMEO,
    };
  }
};
