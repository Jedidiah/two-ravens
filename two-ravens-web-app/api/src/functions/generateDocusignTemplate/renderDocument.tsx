import React from 'react';

import ReactPDF, { Document, Page, Text } from '@react-pdf/renderer';
import { CameraTrapBatch } from 'types/graphql';

import PdfPhotoPage from '../../../../web/src/components/PdfPhotoPage/PdfPhotoPage';

export default async function renderDocument(batch) {
  const filepath = `${__dirname}/{batch.id}.pdf`;
  await ReactPDF.renderToFile(
    <Document title="Image Approval">
      <Page>
        <Text>Title Page</Text>
      </Page>
      {batch.photos.map((photo, index) => {
        return (
          <PdfPhotoPage
            key={photo.large}
            photo={photo}
            index={index}
            total={batch.photos.length}
          />
        );
      })}
    </Document>,
    filepath
  );
}
