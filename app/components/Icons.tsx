import { cx } from "../../utils/formatters";

const ICON_SIZE = {
  xs: "w-4",
  s: "w-5",
  m: "w-7",
};

const resolveSize = (size?: keyof typeof ICON_SIZE) => ICON_SIZE[size ?? "s"];

type IconProps = {
  size?: keyof typeof ICON_SIZE;
};

export function InstagramIcon({ size }: IconProps) {
  return (
    <div className={cx(["inline-flex", resolveSize(size)])}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path
          d="M349.33 69.33a93.62 93.62 0 0 1 93.34 93.34v186.66a93.62 93.62 0 0 1-93.34 93.34H162.67a93.62 93.62 0 0 1-93.34-93.34V162.67a93.62 93.62 0 0 1 93.34-93.34zm0-37.33H162.67C90.8 32 32 90.8 32 162.67v186.66C32 421.2 90.8 480 162.67 480h186.66C421.2 480 480 421.2 480 349.33V162.67C480 90.8 421.2 32 349.33 32"
          fill="currentColor"
        />
        <path
          d="M377.33 162.67a28 28 0 1 1 28-28 27.94 27.94 0 0 1-28 28M256 181.33A74.67 74.67 0 1 1 181.33 256 74.75 74.75 0 0 1 256 181.33m0-37.33a112 112 0 1 0 112 112 112 112 0 0 0-112-112"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function LinkedinIcon({ size }: IconProps) {
  return (
    <div className={cx(["inline-flex", resolveSize(size)])}>
      <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 24C0 10.7452 10.7452 0 24 0C37.2548 0 48 10.7452 48 24C48 37.2548 37.2548 48 24 48C10.7452 48 0 37.2548 0 24ZM16.9605 19.8778H11.5216V36.2196H16.9605V19.8778ZM17.3188 14.8227C17.2835 13.2204 16.1377 12 14.277 12C12.4164 12 11.2 13.2204 11.2 14.8227C11.2 16.3918 12.3805 17.6473 14.2064 17.6473H14.2412C16.1377 17.6473 17.3188 16.3918 17.3188 14.8227ZM36.5754 26.8497C36.5754 21.8303 33.8922 19.4941 30.3131 19.4941C27.4254 19.4941 26.1326 21.0802 25.4107 22.1929V19.8783H19.9711C20.0428 21.4117 19.9711 36.22 19.9711 36.22H25.4107V27.0934C25.4107 26.605 25.446 26.1178 25.5898 25.7681C25.9829 24.7924 26.8779 23.7822 28.3805 23.7822C30.3494 23.7822 31.1365 25.2807 31.1365 27.4767V36.2196H36.5752L36.5754 26.8497Z"
          fill="currentColor"
        />
      </svg>
    </div>
  );
}

export function LocationIcon({ size }: IconProps) {
  return (
    <div className={cx(["inline-flex", resolveSize(size)])}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <circle fill="currentColor" cx="256" cy="192" r="32" />
        <path
          fill="currentColor"
          d="M256 32c-88.22 0-160 68.65-160 153 0 40.17 18.31 93.59 54.42 158.78 29 52.34 62.55 99.67 80 123.22a31.75 31.75 0 0051.22 0c17.42-23.55 51-70.88 80-123.22C397.69 278.61 416 225.19 416 185c0-84.35-71.78-153-160-153zm0 224a64 64 0 1164-64 64.07 64.07 0 01-64 64z"
        />
      </svg>
    </div>
  );
}
