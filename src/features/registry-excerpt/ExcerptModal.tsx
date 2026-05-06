import { useRef, useState } from 'react';
import { Modal, Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import type { GeoObject } from '@/entities/registry/model/types';
import ExcerptDocument from './ExcerptDocument';
import { downloadAsPdf } from './utils';

interface Props {
  obj: GeoObject | null;
  onClose: () => void;
}

export default function ExcerptModal({ obj, onClose }: Props) {
  const downloadRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const qrUrl = `${window.location.origin}/registry/${obj?.id ?? ''}`;
  const d = new Date();
  const issueDate = [
    String(d.getDate()).padStart(2, '0'),
    String(d.getMonth() + 1).padStart(2, '0'),
    d.getFullYear(),
  ].join('.');

  const handleDownload = async () => {
    const el = downloadRef.current;
    if (!el) return;
    setDownloading(true);
    try {
      await downloadAsPdf(
        el,
        `excerpt-${obj?.registryNumber ?? obj?.id ?? 'object'}.pdf`
      );
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Modal
      open={!!obj}
      onCancel={onClose}
      footer={
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Yopish</Button>
          <Button
            icon={<DownloadOutlined />}
            loading={downloading}
            onClick={() => void handleDownload()}
          >
            Yuklab olish
          </Button>
        </div>
      }
      width={720}
      title="Ko'chirma"
      styles={{ body: { padding: 0, maxHeight: '78vh', overflowY: 'auto' } }}
      centered
    >
      <div ref={downloadRef}>
        <ExcerptDocument obj={obj} qrUrl={qrUrl} issueDate={issueDate} />
      </div>
    </Modal>
  );
}
