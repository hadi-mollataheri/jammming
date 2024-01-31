// This component will be used inside of the Playlist component.

import React from "react";

function Tracklist({ tracks }) {

    return (
        <div>
            <p>{tracks}</p>
        </div>
    );
}

export default Tracklist;
