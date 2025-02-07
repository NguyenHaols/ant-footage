const ANT_MUSIC_WEBSITE = 'https://ant-music.net';

export const getOriginalSongURL = (idString: string) =>
    `${ANT_MUSIC_WEBSITE}/songs/${idString}`;

export const getSongMetadata = async (audioFile: File) => {
    const audioContext = new AudioContext();
    const buffer = await audioFile.arrayBuffer();
    const audioBuffer = await audioContext.decodeAudioData(buffer);
    const channelData = audioBuffer.getChannelData(0);
    const peaks = [];
    const step = Math.ceil(channelData.length / 1024);
    for (let i = 0; i < channelData.length; i += step) {
        let max = 0;
        for (let j = 0; j < step; j++) {
            const val = Math.abs(channelData[i + j]);
            if (val > max) {
                max = val;
            }
        }
        peaks.push(max);
    }
    const duration = audioBuffer.duration;
    return { peaks, duration };
};

export const convertPeaks = (peaks: number[]) => {
    return peaks.join(';');
};

export const parsePeaks = (value: any) => {
    try {
        return value.split(';');
    } catch {
        return [];
    }
};
