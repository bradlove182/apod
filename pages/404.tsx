
import Link from "next/link";
import React from "react";
import Head from "next/head";

const NotFound = (): JSX.Element => (
    <React.Fragment>
        <Head>
            <title>
                { "404 - Page Not Found" }
            </title>
        </Head>
        <div className="fixed inset-0 flex justify-center content-center">
            <div className="grid grid-rows-3 gap-4 h-min self-center prose text-primary">
                <svg
                    className="mx-auto hover:animate-spin"
                    fill="none"
                    height="64"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="64"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="8" x2="16" y1="15" y2="15" />
                    <line x1="9" x2="9.01" y1="9" y2="9" />
                    <line x1="15" x2="15.01" y1="9" y2="9" />
                </svg>
                <h1 className="text-center">
                    { "404 - Page Not Found" }
                </h1>
                <Link href="/">
                    <button className="btn" type="button">
                        { "Home" }
                    </button>
                </Link>
            </div>
        </div>
    </React.Fragment>
);

export default NotFound;
