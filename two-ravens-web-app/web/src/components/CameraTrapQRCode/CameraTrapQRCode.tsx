import { useEffect, useRef, useState } from 'react';

import { ActionButton, Flex, View } from '@adobe/react-spectrum';
import QRCode from 'qrcode';
import { stringify } from 'query-string';

import { Link } from '@redwoodjs/router';

const CameraTrapQrCode = (props: {
  deviceId: string;
  project?: string;
  manufacturer?: string;
}) => {
  const canvasRef = useRef();
  const [downloadUrl, setDownloadUrl] = useState('');
  useEffect(() => {
    const qs = stringify({
      portalUrl: 'https://www.arcgis.com',
      itemId: '8caff307a75a45bf918b12fdfa18a438',
      'field:camera_id': props.deviceId,
      'field:project_name': props.project,
      'field:camera_make': props.manufacturer,
    });
    QRCode.toDataURL(
      canvasRef.current,
      `arcgis-survey123://?${qs}`,
      // For video demo so random people don't scan from video and submit forms
      // 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      { scale: 4, margin: 8 },
      function (error, data: string) {
        if (error) console.error(error);
        setDownloadUrl(
          data.replace(/^data:image\/[^;]/, 'data:application/octet-stream')
        );
      }
    );
  }, [canvasRef, props.deviceId, props.manufacturer, props.project]);

  return (
    <Flex>
      <canvas ref={canvasRef}></canvas>
      <View padding="size-200" maxWidth="35rem">
        <p>
          This QR Code is intended to be printed on a sticker and placed inside
          the camera trap. When scanned if the user has the Survey123 App
          installed it will open up the correct form and populate the fields
          relating to this camera trap. This will minimise user error inputting
          IDs which could cause issues matching up batches and photos.
        </p>
        <p>
          The QR Code lauches the app directly and does not require an internet
          connection.
        </p>
        <Link to={downloadUrl} download={`${props.deviceId}-QRCode.png`}>
          <ActionButton>Download QR Code</ActionButton>
        </Link>
      </View>
    </Flex>
  );
};

export default CameraTrapQrCode;
