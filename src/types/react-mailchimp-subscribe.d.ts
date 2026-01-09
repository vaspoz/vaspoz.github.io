declare module 'react-mailchimp-subscribe' {
  import { ComponentType, ReactNode } from 'react';

  interface RenderProps {
    subscribe: (data: { EMAIL: string }) => void;
    status: 'sending' | 'success' | 'error' | null;
    message: string | Error | null;
  }

  interface MailchimpSubscribeProps {
    url: string;
    render: (props: RenderProps) => ReactNode;
  }

  const MailchimpSubscribe: ComponentType<MailchimpSubscribeProps>;

  export default MailchimpSubscribe;
}
