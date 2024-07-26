import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      Task is done here: <Link href={"/rose"}>Gilded Rose</Link>
    </div>
  );
}
