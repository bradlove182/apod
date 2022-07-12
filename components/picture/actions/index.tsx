
import React from "react";

export const PictureActions: React.ComponentType = () => (
    <div className="gap-2 flex relative z-20">
        <div className="tooltip" data-tip="Fullscreen">
            <button aria-label="Fullscreen Image" className="btn btn-square btn-sm" type="button">
                <svg
                    fill="none"
                    height="20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
            </button>
        </div>
        <div className="tooltip" data-tip="Download">
            <button aria-label="Download Image" className="btn btn-square btn-sm" type="button">
                <svg
                    fill="none"
                    height="20"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    width="20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" x2="12" y1="15" y2="3" />
                </svg>
            </button>
        </div>
    </div>
);
