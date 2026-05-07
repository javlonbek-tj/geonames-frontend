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
      <h2 className="text-xl font-extrabold text-[#0f1f3d] mb-1.5">
        Kodni kiriting
      </h2>
      <p className="text-[13px] text-gray-500 mb-6 leading-relaxed">
        <strong>{phone}</strong> raqamingizga Telegram orqali 6 xonali kod
        yuborildi.
      </p>

      <Form form={form} layout="vertical" onFinish={(v) => onSubmit(v.code)}>
        <Form.Item
          name="code"
          label={
            <span className="font-semibold text-[13px]">Tasdiqlash kodi</span>
          }
          rules={[
            { required: true, message: 'Kodni kiriting' },
            { len: 6, message: '6 xonali kod kiriting' },
          ]}
        >
          <Input.OTP
            length={6}
            size="large"
            onChange={(val) => {
              form.setFieldValue('code', val);
              if (val.length === 6) form.submit();
            }}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          loading={isPending}
          className="font-bold h-11 mt-1"
        >
          Tasdiqlash
        </Button>
        <Button
          block
          size="large"
          onClick={() => {
            onBack();
            form.resetFields();
          }}
          className="h-11 mt-2.5"
        >
          Raqamni o&apos;zgartirish
        </Button>
      </Form>
    </>
  );
}
