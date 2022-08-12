import { Image } from '@adobe/react-spectrum';

function ImageBlock(props: {
  photos: Array<{ __typename?: 'Photo'; id: string; thumb: string } | null>;
}) {
  const photos = props.photos.slice(0, 3);
  return (
    <ul
      style={{
        display: 'flex',
        flexDirection: 'row',
        listStyle: 'none',
        perspective: '1000px',
        padding: 0,
        margin: 0,
        textIndent: 0,
      }}
    >
      {photos.map((photo, index) => (
        <li
          key={photo.id}
          style={{
            zIndex: props.photos.length - index + 1,
            transform: `translateZ(-${175 * (index + index)}px) translateX(-${
              70 * index
            }px) rotateY(${(index + 1) * 20}deg)`,
            filter: `brightness(${1 - index * 0.15})`,
            background: 'white',
            padding: '6px 6px 9px 6px',
            boxShadow: 'rgba(0,0,0,0.3) 0px 3px 2px',
          }}
        >
          <Image
            alt=""
            width="size-1600"
            height="size-1600"
            src={photo.thumb}
            objectFit="cover"
          />
        </li>
      ))}
    </ul>
  );
}

export default ImageBlock;
