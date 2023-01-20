import { title } from "process";
import { createPubSub } from "../pubsub";
import { createAudio } from "./audio";
import { State, Track, Playlist } from "./types";
import { tracks } from "@/utils/helpers";

const createPlayer = () => {
  const pubsub = createPubSub();
  const audio = createAudio();

  let currentPlayList: Playlist = tracks.playlist;
  // let currentPlayList: Playlist = {
  //   id: '',
  //   title: '',
  //   imageUrl: '',
  //   tracks: [],
  // }

  let state: State = {
    ...audio.getState(),
    //tracks : [],
    // added Playlist
    playlist: currentPlayList,
    currentTrackIndex: 2,
    currentTrack: {
      id: "5227663d-9493-4b52-ac57-03747e4b9290",
      title: "Mood (Lofi)",
      url: "https://res.cloudinary.com/dehs50yqa/video/upload/v1650561933/Songs/Mood_Lofi_cirjjc.mp3",
      artist: { id: "3",  name: "Salem ilese" },
    },
  };

  const setState = (value: Partial<State>) => {
    state = { ...state, ...value };

    pubsub.publish("change", state);
  };

  audio.subscribe(setState);

  const changeTrack = () => {
    const track = state.currentTrack;


    if (track) {
      audio.setUrl(track.url);
      audio.play();
    }
  };

  const initTrack = () => {
    const track = state.currentTrack;


    if (track) {
      audio.setUrl(track.url);
      audio.play();
    }
  };



  const next = () => {
    if (state.currentTrackIndex === null) {
      return;
    }

    const lastIndex = state.playlist.tracks.length - 1;
    const newIndex = state.currentTrackIndex + 1;

    if (newIndex <= lastIndex) {
      setState({
        currentTrackIndex: newIndex,
        currentTrack: state.playlist.tracks[newIndex],
      });

      changeTrack();
    }
  };

  audio.onEnded(next);

  return {
    play: audio.play,
    pause: audio.pause,
    seek: audio.seek,
    // playing: audio.playing,
    loadTrack(){
      initTrack()
    },
    
    volume: audio.volume,
    getCurrentTime: audio.getCurrentTime,
    getElement: audio.getElement,
    onChangeCurrentTime: audio.onChangeCurrentTime,
    setInitialState: audio.setInitialState,

    getState() {
      return state;
    },

    setQueue(playlist: Playlist, index: number) {
      //setState({tracks})
      // Added  tracks to Playlist
      setState({ playlist });
      state.currentTrackIndex = index;
      state.currentTrack = playlist.tracks[index];
      changeTrack();
    },

    playTrack(trackIndex: number) {
      setState({
        currentTrackIndex: trackIndex,
        currentTrack: state.playlist.tracks[trackIndex],
      });

      changeTrack();
    },

    next,

    prev() {
      if (state.currentTrackIndex === null) {
        return;
      }

      const newIndex = state.currentTrackIndex - 1;

      if (newIndex >= 0) {
        setState({
          currentTrack: state.playlist.tracks[newIndex],
          currentTrackIndex: newIndex,
        });

        changeTrack();
      }
    },

    subscribe(listener: (newState: State) => void) {
      return pubsub.subscribe("change", listener);
    },
  };
};

const player = createPlayer();

export default player;