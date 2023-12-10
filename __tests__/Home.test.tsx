//_/Home.test.js

import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../src/containers/home'; // Home bileşeninizin doğru yolunu belirtmelisiniz

describe('Home component', () => {
  test('renders correctly', () => {
    const { getByTestId,debug } = render(<Home />);
      debug();
    // Home bileşeninizin doğru render edildiğini doğrulayacak testler ekleyebilirsiniz
    // expect(getByText('E-Market')).toBeDefined();
   
  });

  // it('handles search correctly', () => {
  //   const { getByPlaceholderText, getByText } = render(<Home />);

  //   // Arama yapma işlemini test etmek için fireEvent ve expect kullanabilirsiniz
  //   fireEvent.changeText(getByPlaceholderText('Search'), 'example search');
  //   // fireEvent.submit(getByPlaceholderText('Search'));

  //   // Arama sonuçlarına göre bileşeninizin doğru güncellendiğini doğrulayacak testler ekleyebilirsiniz
  //   expect(getByText('Example Product')).toBeDefined();
  // });

  // Diğer test senaryolarını buraya ekleyebilirsiniz
});
