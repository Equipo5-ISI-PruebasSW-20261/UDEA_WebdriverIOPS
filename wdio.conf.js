export const config = {
    runner: 'local',
    specs: [
        './features/**/login.feature',
        './features/**/accountOverview.feature',
        './features/**/transfer.feature'
    ],
    exclude: [],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
    }],
    logLevel: 'info',
    bail: 0,
    baseUrl: 'https://parabank.parasoft.com/parabank',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['chromedriver'],
    framework: 'cucumber',
    reporters: ['spec'],
    cucumberOpts: {
        require: [
            './features/step-definitions/Steps.login.js',
            './features/step-definitions/Steps.accountoverview.js',
            './features/step-definitions/Steps.transfer.js',
            './features/support/hooks.js'
        ],
        backtrace: false,
        requireModule: [],
        dryRun: false,
        failFast: false,
        snippets: true,
        source: true,
        strict: false,
        tagExpression: '',
        timeout: 60000,
        ignoreUndefinedDefinitions: false,
    },
};