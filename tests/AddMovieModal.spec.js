import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import { shallow, configure } from 'enzyme';

import { AddMovieModal } from '../src/components/Modal/components/AddMovieModal/AddMovieModal';
import { ModalButton } from '../src/components/Modal/components/ModalButton/ModalButton';
import { GenresPickerModal } from '../src/components/Modal/components/GenresPickerModal/GenresPickerModal';

configure({ adapter: new Adapter() });

const props = {
  onClose: jest.fn()
};

describe('AddMovieModal component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<AddMovieModal {...props} />);
  });

  it('Form must be rendered correctly', () => {
    const inputs = wrapper.find('input');
    const buttons = wrapper.find('ModalButton');

    expect(wrapper.find('form').length).toBe(1);
    expect(inputs.length).toBe(6);
    expect(inputs.at(0).props().name).toBe('title');
    expect(inputs.at(1).props().name).toBe('release date');
    expect(inputs.at(2).props().name).toBe('movie url');
    expect(inputs.at(3).props().name).toBe('genres');
    expect(inputs.at(4).props().name).toBe('overview');
    expect(buttons.at(0).props().text).toBe('reset');
    expect(buttons.at(1).props().text).toBe('save');
  });

  it('Modal with genres must work correctly', () => {
    wrapper.find('.modal__genres-icon').props().onClick({ preventDefault: () => {} });

    wrapper.find('GenresPickerModal').props().onCheckBoxChange({ target: { value: 'testGenre' } });

    expect([...wrapper.find('GenresPickerModal').props().pickedGenres]).toEqual(['testGenre']);

    wrapper.find('GenresPickerModal').props().onCheckBoxChange({ target: { value: 'testGenre' } });

    expect([...wrapper.find('GenresPickerModal').props().pickedGenres]).toEqual([]);
  });

  it('Reset button must reset inputs to initial values', () => {
    wrapper.find('form').simulate('submit', { preventDefault: () => {} });
    wrapper.find('.modal__value').first().props().onChange({ target: { value: 'test', id: 'title' }, preventDefault: () => {} });

    expect(wrapper.find('.modal__value').first().props().value).toBe('test');

    wrapper.find('ModalButton').first().props().onClick();

    expect(wrapper.find('.modal__value').first().props().value).toBe('');
  });
});

describe('ModalButton component', () => {
  it('Must be rendered and work correctly', () => {
    const props = {
      mode: 'primary',
      text: 'testText',
      onClick: jest.fn(),
      type: 'submit'
    };
    const button = shallow(<ModalButton {...props} />);

    expect(button.props().className).toBe('modal__button modal__primary-button');
    expect(button.props().type).toBe('submit');
    expect(button.props().children).toBe('testText');
    expect(typeof button.props().onClick).toBe('function');

    button.props().onClick();

    expect(props.onClick).toHaveBeenCalled();
  });
});

describe('GenresPickerModal component', () => {
  it('Must be rendered and work correctly', () => {
    const props = {
      onClose: jest.fn(),
      onCheckBoxChange: jest.fn(),
      pickedGenres: new Set('test')
    };
    const modal = shallow(<GenresPickerModal {...props} />);
    const genre = modal.find('input').at(0);
    const closeBtn = modal.find('.modal__close');

    expect(modal.find('input').length).toBe(16);

    expect(genre.props().type).toBe('checkbox');
    expect(genre.props().value).toBe('Action');
    expect(genre.props().name).toBe('Action');
    expect(genre.props().checked).toBe(false);
    expect(typeof genre.props().onChange).toBe('function');

    genre.props().onChange();

    expect(props.onCheckBoxChange).toHaveBeenCalled();

    closeBtn.props().onClick();

    expect(props.onClose).toHaveBeenCalled();
  });
});
