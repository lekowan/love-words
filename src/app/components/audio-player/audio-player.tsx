import { useAudioPlayback } from "@/app/hooks/useAudioPlayback"

interface AudioIconProps {
  sentence: string
}

export const AudioPlayer = ({ sentence }: AudioIconProps) => {
  const { playAudio } = useAudioPlayback()

  return (
    <div
      className="tw-flex tw-items-center"
      onClick={() => playAudio(sentence)}
    >
      <svg
        width="22"
        height="21"
        viewBox="0 0 132 127"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_8_2752)">
          <path
            d="M98.3869 7.10114C98.3041 5.72541 98.0728 4.36255 97.6974 3.03588C97.5781 2.46633 97.335 1.92951 96.985 1.46312C96.635 0.996729 96.1873 0.611966 95.6724 0.335756C95.1139 0.11014 94.513 0.00661411 93.9108 0.0321041C93.3085 0.057594 92.7187 0.211522 92.1817 0.483509C91.2484 0.878761 90.2773 1.24614 89.3381 1.60122C88.5358 1.90576 87.7335 2.20907 86.9397 2.53369C85.6812 3.04882 84.4181 3.55357 83.1544 4.05963C79.8273 5.39118 76.3874 6.76809 73.0798 8.3031C69.2469 10.0818 65.2704 12.1701 60.9226 14.6887C50.1428 20.9324 39.616 27.0596 29.3367 33.3733C27.6358 34.5037 25.6401 35.1162 23.5942 35.1357C19.412 35.2083 15.2401 35.4947 11.2058 35.772C3.40059 36.3098 2.08678 39.0954 1.95513 45.553C1.93427 46.6117 1.94142 47.6699 1.94924 48.728C1.95641 49.7744 1.96488 50.8209 1.94272 51.8667C1.68202 64.6315 1.39322 79.0969 1.06344 93.3805C0.982623 96.8723 2.75471 99.3968 5.92413 100.305C7.27056 100.676 8.66221 100.861 10.0594 100.851C15.7296 100.836 23.1445 100.52 30.3749 98.2246C31.2522 98.7741 32.1241 99.3249 32.9909 99.8769C35.0152 101.161 37.108 102.488 39.2053 103.724C53.4621 112.119 68.8878 118.67 83.8062 125.005L86.6595 126.218C86.8557 126.308 87.0577 126.384 87.265 126.446C87.6201 126.554 87.9897 126.611 88.3612 126.616C88.8487 126.627 89.3284 126.492 89.7364 126.227C90.0766 125.972 90.3535 125.644 90.5471 125.267C90.7407 124.891 90.845 124.475 90.8528 124.052C90.8808 123.764 90.8925 123.472 90.9043 123.18C90.901 122.671 90.961 122.163 91.0829 121.668C94.1154 111.902 96.2472 101.882 97.451 91.7314L97.8949 87.8514C99.0947 77.4297 100.334 66.6547 100.458 55.9294C100.62 41.9788 99.7139 27.8592 98.8373 14.2047C98.6861 11.8379 98.5355 9.47008 98.3869 7.10114ZM85.3247 116.119C85.3899 116.837 85.4551 117.555 85.5411 118.493V118.51C73.6833 108.35 60.237 101.426 47.2185 94.7237C44.3372 93.2399 41.3619 91.7087 38.4721 90.1744C38.5184 87.5339 38.5816 84.9369 38.6455 82.3691C38.7954 76.2355 38.9381 70.4427 38.8449 64.5602C38.7504 58.6515 38.424 52.8567 38.0792 46.7218C37.9345 44.1637 37.7891 41.581 37.6594 38.9632C38.0234 38.6969 38.4012 38.4499 38.7914 38.2233C42.9625 35.8746 47.1354 33.5303 51.3101 31.1903C60.935 25.7889 70.888 20.2042 80.6309 14.6291C82.9504 13.2409 85.1911 11.7267 87.3438 10.0934C88.0835 9.55561 88.8428 9.00484 89.6216 8.44695C89.5715 9.2245 89.5206 9.98521 89.4698 10.7291C89.3029 13.1913 89.1439 15.5155 89.0559 17.8371C88.9797 19.8221 88.9021 21.8076 88.8226 23.7938C88.5078 31.7469 88.1826 39.9721 88.0145 48.0671C87.6951 63.5066 86.6784 80.1958 84.905 99.0883C84.3634 104.914 84.815 110.697 85.3247 116.119ZM28.3389 65.7677C28.3578 66.6353 28.3727 67.5036 28.3883 68.3731C28.5043 74.8352 28.623 81.5086 30.0764 88.5033H11.6151C11.6093 88.4664 11.6035 88.4294 11.5969 88.3925C11.4967 87.8657 11.4343 87.3324 11.4105 86.7966C11.3192 82.2427 11.2338 77.6875 11.1538 73.1317C11.0465 67.1705 10.9324 61.209 10.8115 55.2477C10.7783 53.716 10.6747 52.1667 10.5743 50.6693C10.5091 49.6494 10.4387 48.6295 10.3912 47.609C10.3553 46.8191 10.3639 46.024 10.3737 45.1829C10.3737 44.9885 10.3781 44.7942 10.3794 44.5998L28.722 43.5067C28.6758 45.5705 28.6119 47.6414 28.5494 49.7181C28.3891 54.9711 28.2235 60.4049 28.3389 65.7677Z"
            fill="black"
          />
          <path
            d="M116.388 30.8967C114.655 29.4751 112.307 29.2425 110.927 30.3595C109.597 31.4371 109.292 33.4769 110.17 35.4383C110.588 36.372 111.091 37.2714 111.576 38.141C111.79 38.5245 112.004 38.9081 112.212 39.2962C117.328 48.84 119.599 57.0581 119.358 65.1608V65.1887C119.416 72.0959 117.647 78.8969 114.23 84.9112C112.545 88.0014 110.928 91.1887 109.364 94.2717C108.702 95.5766 108.038 96.8803 107.372 98.1827C106.909 99.084 106.047 100.762 107.609 101.727C108.164 102.041 108.795 102.197 109.434 102.181C109.965 102.187 110.493 102.09 110.989 101.896C114.407 100.511 117.439 98.3272 119.828 95.5293C124.231 90.2452 127.318 85.0739 129.263 79.7191C130.737 75.6836 131.451 71.4129 131.367 67.1202C131.133 55.1648 126.952 44.0529 118.585 33.1452C117.941 32.3149 117.204 31.5604 116.388 30.8967Z"
            fill="black"
          />
        </g>
        <defs>
          <clipPath id="clip0_8_2752">
            <rect
              width="131"
              height="127"
              fill="white"
              transform="translate(0.777344)"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}