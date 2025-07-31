import '@testing-library/jest-dom';
import 'whatwg-fetch';

import { TextEncoder, TextDecoder } from 'util';

(global as any).TextEncoder = TextEncoder;
(global as any).TextDecoder = TextDecoder;

// MSW를 통한 테스트를 위해 이 부분이 적용되어야 하나, 어떤 이유에서인지 이 부분을 적용하면 전체 테스트 코드가 작동이 안됨
// 이 부분을 삭제하면 MSW 테스트 코드 외 나머지는 정상 작동함
/*
import { server } from './src/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
*/
