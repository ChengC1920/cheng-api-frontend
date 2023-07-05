import { ProColumns, ProFormInstance, ProTable } from '@ant-design/pro-components';
import '@umijs/max';
import { Modal } from 'antd';
import React, { useEffect, useRef } from 'react';

export type FormValueType = {
    target?: string;
    template?: string;
    type?: string;
    time?: string;
    frequency?: string;
} & Partial<API.RuleListItem>;

export type Props = {
    values: API.InterfaceInfoVO;
    onCancel: () => void;
    visible: boolean;
};

/**
 * table 展示的列
 * */
const columns: ProColumns<API.InterfaceInfoVO>[] = [
    {
        title: 'id',
        dataIndex: 'id',
        valueType: 'index',
        readonly: true,
        render: (_) => <p>{_}</p>,
    },
    {
        title: '接口名称',
        dataIndex: 'name',
        valueType: 'text',
        readonly: true,
    },
    {
        title: '描述',
        dataIndex: 'description',
        valueType: 'textarea',
        readonly: true,
    },
    {
        title: '请求方法',
        dataIndex: 'method',
        valueType: 'text',
        readonly: true,
    },
    {
        title: '主机名',
        dataIndex: 'host',
        valueType: 'text',
        readonly: true,
    },
    {
        title: '接口地址',
        dataIndex: 'url',
        valueType: 'text',
        readonly: true,
    },
    {
        title: '请求参数',
        dataIndex: 'requestParams',
        valueType: 'jsonCode',
        readonly: true,
    },
    {
        title: '请求头',
        dataIndex: 'requestHeader',
        valueType: 'jsonCode',
        readonly: true,
    },
    {
        title: '响应头',
        dataIndex: 'responseHeader',
        valueType: 'jsonCode',
        readonly: true,
    },
];
const ShowModal: React.FC<Props> = (props) => {
    const { values, visible, onCancel } = props;
    const formRef = useRef<ProFormInstance>();
    useEffect(() => {
        if (formRef) {
            formRef.current?.setFieldsValue(values);
        }
    }, [values]);
    return (
        <Modal open={visible} footer={null} onCancel={() => onCancel?.()}>
            <ProTable type={'form'} columns={columns} formRef={formRef} />
        </Modal>
    );
};
export default ShowModal;
