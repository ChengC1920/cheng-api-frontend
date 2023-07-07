import {
    DrawerForm,
    ProColumns,
    ProForm,
    ProFormDateRangePicker,
    ProFormSelect,
    ProFormText
} from '@ant-design/pro-components';
import '@umijs/max';
import React from 'react';

export type Props = {
    values: API.InterfaceInfoVO;
    setHandleShowModalOpen: (visible: boolean) => void;
    showModalOpen: boolean;
};

const ShowModal: React.FC<Props> = (props) => {
    const {values, setHandleShowModalOpen, showModalOpen} = props;

    return (
        <DrawerForm
            onOpenChange={setHandleShowModalOpen}
            title="查看接口"
            open={showModalOpen}
            submitter={false}
        >
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="name"
                    disabled
                    label="接口名称"
                    initialValue={ values.name }
                />

                <ProFormText
                    width="md"
                    name="description"
                    disabled
                    label="描述"
                    initialValue={ values.description }
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="method"
                    disabled
                    label="请求方法"
                    initialValue={ values.method }
                />

                <ProFormText
                    width="md"
                    name="host"
                    disabled
                    label="主机名"
                    initialValue={ values.host }
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="host"
                    disabled
                    label="主机名"
                    initialValue={ values.host }
                />

                <ProFormText
                    width="md"
                    name="url"
                    disabled
                    label="接口地址"
                    initialValue={ values.url }
                />
            </ProForm.Group>
            <ProForm.Group>
                <ProFormText
                    width="md"
                    name="requestParams"
                    disabled
                    label="请求参数"
                    initialValue={ values.requestParams }
                />

                <ProFormText
                    width="md"
                    name="requestHeader"
                    disabled
                    label="请求头"
                    placeholder={""}
                    initialValue={ values.requestHeader }
                />
            </ProForm.Group>
            <ProFormText
                name="responseHeader"
                disabled
                label="响应头"
                placeholder={""}
                initialValue={ values.responseHeader }
            />
        </DrawerForm>
    );
};
export default ShowModal;
