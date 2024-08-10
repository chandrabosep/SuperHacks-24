import React from "react";

const ShareButtons = () => {
	return (
		<div className="flex flex-col items-center">
			<p className="text-sm mb-1.5">Share On</p>
			<div className="flex gap-3">
				<div
					className="twitter-share-button rounded-full bg-white w-[2em] h-[2em] flex items-center justify-center border border-black"
					rel="noreferrer"
					data-url="https://devcon.org/sea/ticket/Chandra/"
					data-size="large"
					data-via="efdevcon"
				>
					<svg
						width="1em"
						height="1em"
						viewBox="0 0 46 43"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="icon"
					>
						<path
							d="M36.18.967h7.028L27.854 18.516l18.063 23.88H31.773L20.696 27.913 8.02 42.396H.988l16.423-18.77L.083.965h14.503l10.013 13.239L36.179.967Zm-2.467 37.222h3.895L12.47 4.952H8.29L33.714 38.19Z"
							fill="#000"
						></path>
					</svg>
				</div>
				<div
					className="rounded-full  w-[2em] h-[2em] flex items-center justify-center border border-black"
					style={{ color: "#8c72ae" }}
					rel="noreferrer"
				>
					<svg
						width="1em"
						height="1em"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						className="icon"
					>
						<path
							d="M4.775 2h14.19v20.177h-2.083v-9.242h-.02a5.012 5.012 0 0 0-9.984 0h-.02v9.242H4.775V2Z"
							fill="#000000"
						></path>
						<path
							d="m1 4.864.846 2.864h.716v11.586a.65.65 0 0 0-.65.65v.782h-.13a.65.65 0 0 0-.652.65v.781h7.29v-.78a.65.65 0 0 0-.65-.651h-.13v-.781a.65.65 0 0 0-.652-.651h-.78V4.864H1ZM17.012 19.314a.65.65 0 0 0-.651.65v.782h-.13a.65.65 0 0 0-.651.65v.781h7.29v-.78a.65.65 0 0 0-.651-.651h-.13v-.781a.65.65 0 0 0-.651-.651V7.728h.716L23 4.864h-5.207v14.45h-.781Z"
							fill="#000000"
						></path>
					</svg>
				</div>
			</div>
		</div>
	);
};

export default ShareButtons;
