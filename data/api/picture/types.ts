
export interface Picture extends Record<string, string | undefined>{

    copyright?: string;
    date: string;
    explanation: string;
    hdurl: string;
    mediaType: "image" | "video";
    serviceVersion: string;
    title: string;
    url: string;

}

export interface PictureError{

    code: number;
    msg: string;
    serviceVersion: string;

}

export interface GetPicture extends Record<string, string>{
    date: string;
}

export interface GetPictures extends Record<string, string>{
    startDate: string;
    endDate: string;
}
