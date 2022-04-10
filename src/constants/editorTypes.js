import Blockquote from "../icons/Blockquote";
import Bold from "../icons/Bold";
import BulletedList from "../icons/BulletedList";
import Code from "../icons/Code";
import HeadingOne from "../icons/HeadingOne";
import HeadingThree from "../icons/HeadingThree";
import HeadingTwo from "../icons/HeadingTwo";
import Image from "../icons/Image";
import Italic from "../icons/Italic";
import Link from "../icons/Link";
import NumberedList from "../icons/NumberedList";
import Underline from "../icons/Underline";

export const ALL_TYPE = {
  inline: [
    { label: "Bold", style: "BOLD", icon: <Bold /> },
    { label: "Italic", style: "ITALIC", icon: <Italic /> },
    { label: "Underline", style: "UNDERLINE", icon: <Underline /> },
    { label: "Code", style: "CODE", icon: <Code /> },
    { label: "Link", style: "LINK", icon: <Link /> },
    { label: "Image", style: "IMAGE", icon: <Image /> },
  ],
  block: [
    { label: "H1", style: "header-one", icon: <HeadingOne /> },
    { label: "H2", style: "header-two", icon: <HeadingTwo /> },
    { label: "H3", style: "header-three", icon: <HeadingThree /> },
    { label: "Blockquote", style: "blockquote", icon: <Blockquote /> },
    { label: "OL", style: "ordered-list-item", icon: <NumberedList /> },
    { label: "UL", style: "unordered-list-item", icon: <BulletedList /> },
  ],
};
