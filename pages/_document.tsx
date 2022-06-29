
import React from "react";
import Document, {
    Head,
    Html,
    Main,
    NextScript
} from "next/document";

class MyDocument extends Document{

    render(): React.ReactElement{
        return (
            <Html data-theme="dracula" lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }

}

export default MyDocument;
