import React, { useState, useEffect, useRef } from "react";
import { Card, Button } from "react-bootstrap";

const Participant = ({ participant, handleLogout, remote }) => {
  const [videoTracks, setVideoTracks] = useState([]);
  const [audioTracks, setAudioTracks] = useState([]);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  

  const videoRef = useRef();
  const audioRef = useRef();

 

  const handleMuteAudio = () => {
    setIsAudioMuted(!isAudioMuted);

    // Mute/unmute the audio track
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      if (isAudioMuted) {
        audioTrack.attach(audioRef.current);
      } else {
        audioTrack.detach();
      }
    }
  };

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track !== null);

  useEffect(() => {
    setVideoTracks(trackpubsToTracks(participant.videoTracks));
    setAudioTracks(trackpubsToTracks(participant.audioTracks));

    const trackSubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => [...videoTracks, track]);
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => [...audioTracks, track]);
      }
    };

    const trackUnsubscribed = (track) => {
      if (track.kind === "video") {
        setVideoTracks((videoTracks) => videoTracks.filter((v) => v !== track));
      } else if (track.kind === "audio") {
        setAudioTracks((audioTracks) => audioTracks.filter((a) => a !== track));
      }
    };

    participant.on("trackSubscribed", trackSubscribed);
    participant.on("trackUnsubscribed", trackUnsubscribed);

    return () => {
      setVideoTracks([]);
      setAudioTracks([]);
      participant.removeAllListeners();
    };
  }, [participant]);

  useEffect(() => {
    const videoTrack = videoTracks[0];
    if (videoTrack) {
      videoTrack.attach(videoRef.current);
      return () => {
        videoTrack.detach();
      };
    }
  }, [videoTracks]);

  useEffect(() => {
    const audioTrack = audioTracks[0];
    if (audioTrack) {
      if (!isAudioMuted) {
        audioTrack.attach(audioRef.current);
      }
      return () => {
        audioTrack.detach();
      };
    }
  }, [audioTracks, isAudioMuted]);

  return (
    <div className="participant">
      <Card>
        <Card.Body>
          <video ref={videoRef} autoPlay={true} />
          <audio ref={audioRef} autoPlay={true} mute={isAudioMuted} />
          <Card.Title className="text-success text-uppercase">{participant.identity}</Card.Title>
          {remote ? "" : (
            <>
             
              <Button variant="danger" onClick={handleLogout} className="btn btn-danger rounded-lg">
                Leave
              </Button>{" "}
              <Button variant="secondary" onClick={handleMuteAudio}>
                {isAudioMuted ? "Unmute Audio" : "Mute Audio"}
              </Button>
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Participant;
