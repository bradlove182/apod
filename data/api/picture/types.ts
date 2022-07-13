
export interface Picture{

    copyright?: string;
    date: string;
    explanation: string;
    hdurl: string;
    mediaType: "image" | "video";
    serviceVersion: string;
    title: string;
    url: string;
    [key: string]: string | undefined;

}

export interface PictureError{

    code: number;
    msg: string;
    serviceVersion: string;

}

export interface GetPicture{
    [key: string]: string;
    date: string;
}

export interface GetPictures{
    [key: string]: string;
    startDate: string;
    endDate: string;
}
