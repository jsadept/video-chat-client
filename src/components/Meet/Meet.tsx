import React, {useState} from 'react';
import MeetLayout from './MeetLayout/MeetLayout';
import MeetNavigation from "./MeetLayout/MeetNavigation";
import WebCamList from './WebCamList/WebCamList';

const Meet = () => {

    const [chatOpen, setChatOpen] = useState<boolean>(false);

    return (
        <MeetLayout {...{chatOpen, setChatOpen}}>
            <WebCamList />
            <MeetNavigation {...{chatOpen, setChatOpen}} />
        </MeetLayout>
    );
};

export default Meet;
