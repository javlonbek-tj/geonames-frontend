import { Button, Form, Input } from 'antd';

interface Props {
  phone: string;
  onSubmit: (code: string) => void;
  onBack: () => void;
  isPending: boolean;
}

export default function OtpForm({ phone, onSubmit, onBack, isPending }: Props) {
  const [form] = Form.useForm<{ code: string }>();

  return (
    <>
      <h2 style={{ fontSize: 20, fontWeight: 800, color: '#0f1f3d', marginBottom: 6 }}>
        Kodni kiriting
      </h2>
      <p style={{ fontSize: 13, color: '#6b7280', marginBottom: 24, lineHeight: 1.6 }}>
        <strong>{phone}</strong> raqamingizga Telegram orqali 6 xonali kod yuborildi.
      </p>

      <Form form={form} layout='vertical' onFinish={(v) => onSubmit(v.code)}>
        <Form.Item
          name='code'
          label={<span style={{ fontWeight: 600, fontSize: 13 }}>Tasdiqlash kodi</span>}
          rules={[
            { required: true, message: 'Kodni kiriting' },
            { len: 6, message: '6 xonali kod kiriting' },
          ]}
        >
          <Input.OTP
            length={6}
            size='large'
            onChange={(val) => {
              form.setFieldValue('code', val);
              if (val.length === 6) form.submit();
            }}
          />
        </Form.Item>
        <Button
          type='primary'
          htmlType='submit'
          block
          size='large'
          loading={isPending}
          style={{ borderRadius: 10, background: '#1565c0', border: 'none', fontWeight: 700, height: 44, marginTop: 4 }}
        >
          Tasdiqlash
        </Button>
        <Button
          block
          size='large'
          onClick={() => { onBack(); form.resetFields(); }}
          style={{ marginTop: 10, borderRadius: 10, height: 44 }}
        >
          Raqamni o&apos;zgartirish
        </Button>
      </Form>
    </>
  );
}
