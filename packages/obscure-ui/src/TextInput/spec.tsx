import React from 'react';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';

import TextInput from '.';

function TestForm({ children }: React.PropsWithChildren<unknown>): React.ReactElement {
  const { control } = useForm();
  return (
    <form>
      {React.Children.map(children, child => {
        return React.cloneElement(child as React.ReactElement, { control });
      })}
    </form>
  );
}

describe('TextInput', () => {
  it('should render a label', () => {
    render(
      <TestForm>
        <TextInput id="test-input" label="Test Label" name="test-input" />
      </TestForm>
    );

    expect(screen.getByText('Test Label:')).toBeInTheDocument();
  });
});
