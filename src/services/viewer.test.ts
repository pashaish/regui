import { describe, it } from 'mocha';
import { assert } from 'chai';
import { createTreeByKeys } from './viewer';

describe('viewer', () => {
    it('createTreeByKeys', () => {
        const keys = [
            "user:pasha:last_name",
            "user:pasha:first_name",
            "user:sergey:first_name",
            "user:sergey:age",
            "localKey",
        ];
        
        const expected = {
            name: 'root',
            children: [
                {
                    name: 'user',
                    children: [
                        {
                            name: 'pasha',
                            children: [
                                {
                                    name: 'last_name',
                                    children: [],
                                },
                                {
                                    name: 'first_name',
                                    children: [],
                                }
                            ],
                        },
                        {
                            name: 'sergey',
                            children: [
                                {
                                    name: 'age',
                                    children: [],
                                },
                                {
                                    name: 'first_name',
                                    children: [],
                                }
                            ],
                        }
                    ]
                },
                {
                    name: 'localKey',
                    children: [],
                }
            ],
        };

        const exptectedObj = {
            user: {
                pasha: {
                    last_name: {},
                    first_name: {},
                },
                sergey: {
                    first_name: {},
                    age: {},
                },
            },
            localKey: {},
        }

        assert.deepEqual(createTreeByKeys(keys), exptectedObj);
    });
});