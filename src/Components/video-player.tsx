import { useRef } from 'react';
import {
    ControlBar,
    CurrentTimeDisplay,
    ForwardControl,
    PlaybackRateMenuButton,
    Player,
    PlayerProps,
    PlayerReference,
    PlayToggle,
    ReplayControl,
    TimeDivider,
    VolumeMenuButton,
} from 'video-react';

interface VideoPlayerProps extends PlayerProps {}

const VideoPlayer = (props: VideoPlayerProps) => {
    const playerRef = useRef<PlayerReference>();

    function replayVideo() {
        playerRef.current?.seek(0);
        playerRef.current?.play();
    }

    return (
        <Player
            {...props}
            ref={(player: any) => {
                playerRef.current = player;
            }}
            playsInline
            aspectRatio="16:9"
            preload="none"
            onEnded={replayVideo}
        >
            {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
            {/*// @ts-expect-error*/}
            {/* <BigPlayButton disabled /> */}
            <ControlBar autoHideTime={1000}>
                <PlayToggle />
                <ReplayControl />
                <ForwardControl />
                <CurrentTimeDisplay />
                <TimeDivider />
                <PlaybackRateMenuButton />
                <VolumeMenuButton />
            </ControlBar>
        </Player>
    );
};

export { VideoPlayer };
