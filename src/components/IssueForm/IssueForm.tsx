import { useForm } from '@mantine/form';
import { TextInput, Textarea, Button, Box, Select } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconX, IconCheck, IconArrowNarrowLeft } from '@tabler/icons-react';
import { Link, useNavigate } from 'react-router-dom';
import classes from './IssueForm.module.css';
import '@mantine/notifications/styles.css';

interface FormValues {
  title: string;
  description: string;
  priority: string;
  author: string;
  status: string;
}

const IssueForm: React.FC = () => {
  const navigate = useNavigate();
  const form = useForm<FormValues>({
    initialValues: {
      title: '',
      description: '',
      priority: '',
      author: '',
      status: 'pending',
    },
    validate: {
      title: (value: string) =>
        value.trim().length === 0 ? 'Title is required' : null,
      description: (value: string) =>
        value.trim().length === 0 ? 'Description is required' : null,
      priority: (value: string) =>
        value.trim().length === 0 ? 'Priority is required' : null,
      author: (value: string) =>
        value.trim().length === 0 ? 'Author is required' : null,
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    const id = notifications.show({
      loading: true,
      title: 'Submitting your outage report',
      message: 'Please wait while we process your request...',
      autoClose: false,
      withCloseButton: false,
    });

    try {
      const response = await fetch(
        'https://issue-tracker-m82y.onrender.com/api/issues',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
            priority: values.priority,
            status: values.status,
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to submit outage report');
      }

      const data = await response.json();
      console.log('Outage created:', data);

      notifications.update({
        id,
        color: 'teal',
        title: 'Outage Created',
        message: 'Your outage has been successfully created!',
        icon: <IconCheck size={18} />,
        loading: false,
        autoClose: 2000,
      });

      form.reset();
      form.setFieldValue('priority', '');
      navigate('/dashboard');
    } catch (error) {
      console.error('Error creating outage:', error);

      notifications.update({
        id,
        color: 'red',
        title: 'Submission Failed',
        message: 'There was an error creating your outage. Please try again.',
        icon: <IconX size={18} />,
        loading: false,
        autoClose: 2000,
      });
    }
  };

  return (
    <Box className={classes.container}>
      <Link to="/dashboard" className={classes.link}>
        <Button
          ml="-3rem"
          c={'#f36a38ff'}
          color="gray"
          leftSection={<IconArrowNarrowLeft />}
          variant="subtle"
        ></Button>
      </Link>

      <h1 className={classes.title}>Report An Outage</h1>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          label="Title"
          placeholder="Enter outage title"
          {...form.getInputProps('title')}
          className={classes.input}
        />
        <TextInput
          label="Author"
          placeholder="Enter author name"
          {...form.getInputProps('author')}
          className={classes.input}
        />
        <Select
          className={classes.input}
          label="Priority"
          placeholder="Select priority"
          data={[
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
          ]}
          {...form.getInputProps('priority')}
        />
        <Textarea
          label="Description"
          placeholder="Enter outage description"
          {...form.getInputProps('description')}
          className={classes.input}
          minRows={5}
        />
        <Button
          variant="filled"
          type="submit"
          className={classes.button}
          fullWidth
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default IssueForm;
