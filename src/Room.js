import React, { useEffect, useState } from "react";
import Participant from "./Participant";
import Button from 'react-bootstrap/Button';
const Room = ({ roomName, room, handleLogout, }) => {
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = (participant) => {
      setParticipants((prevParticipants) => [...prevParticipants, participant]);
    };
     
    const participantDisconnected = (participant) => {
      setParticipants((prevParticipants) =>
        prevParticipants.filter((p) => p !== participant)
      );
    };

    room.on("participantConnected", participantConnected);
    room.on("participantDisconnected", participantDisconnected);
    room.participants.forEach(participantConnected);
    return () => {
      room.off("participantConnected", participantConnected);
      room.off("participantDisconnected", participantDisconnected);
    };
  }, [room]);

  const remoteParticipants = participants.map((participant) => (
    <Participant key={participant.sid} participant={participant} remote={true} />
  ));

  return (
    <div className="room">
      <h2>GroupName: {roomName}</h2>
     {/* <div className="container-fluid d-flex justify-content-end gap-2">
     <Button variant="danger"  onClick={handleLogout} className="btn btn-danger rounded-lg leave">leave</Button>
    
     </div> */}
      <div className="local-participant">
        {room ? (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
            handleLogout={handleLogout}
          />
        ) : (
          ""
        )}
      </div>
      {
        // console.log(remoteParticipants)
        remoteParticipants.length!=0?<><h3>Remote Participants</h3>
        <div className="remote-participants">{remoteParticipants}</div></>:""
        
        
      }
      
    </div>
  );
};

export default Room;
