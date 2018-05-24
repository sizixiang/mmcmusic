export default class Song {
	constructor({
		id,
		mid,
		singer,
		name,
		album,
		duration,
		image,
		url
	}) {
		this.id = id
		this.mid = mid
		this.singer = singer
		this.name = name
		this.album = album
		this.duration = duration
		this.image = image
		this.url = url
	}
}

export function createSong(musicData) {
	return new Song({
		id: musicData.songid,
		mid: musicData.songmid,
		singer: filterSinger(musicData.singer),
		name: musicData.songname,
		album: musicData.albumname,
		duration: musicData.interval,
		image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
		url: `http://dl.stream.qqmusic.qq.com/C4000022VCY125pxlH.m4a?vkey=7847795718CE074F3E1D693E41EEDE2D729FFC2E5EEE6A8FAA8339F03DFCF1844585BEDCF85D479B64A717920933D5755DEBAD4CD0E55FBF&guid=439900480&uin=1092453305&fromtag=66`
	})
}

function filterSinger(singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}
