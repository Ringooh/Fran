'use strict';

const { Client, version } = require('discord.js');
const { performance } = require('perf_hooks');
const { readdirSync } = require('fs');
const { join } = require('path');

const Anischedule = require(`./Anischedule`);
const CommandManager = require(`./commands/Manager`);
const GuildProfilesManager = require(`./guilds/ProfileManager`);
const Collections = require(`./Collections`);
const Mongoose = require(`./Mongoose`);
const Music = require('./Music');
const PingManager = require(`./PingManager`);
const ImageManager = require(`./Images`);
// const VoteManager = require(`./votes/VoteManager`);

const consoleUtil = require(`../util/console`);
const processEvents = require(`../util/processEvents`);

/**
 * Оптимизированный хаб для взаимодействия с Discord API
 * @extends {Client}
 */

module.exports = class FranClient extends Client{
  /**
   * @param {ClientSettings} [settings] для этого клиента, включая ClientOptions [options] для клиента
   */
  constructor(settings = {}){
    super(settings.client);

    // Инициализируйте бота, войдите в терминал при создании экземпляра.
    console.log(`Инициализация клиента. Пожалуйста, подождите...`);

    /**
     * Префикс по умолчанию, который будет использовать этот экземпляр бота.
     * @type {?string}
     */
    if (typeof settings.prefix !== 'string'){
      settings.prefix = 'f!';
    };

    if (!this.token && 'TOKEN' in process.env){
      /**
      * Токен авторизации для авторизованного бота.
      * Если присутствует, по умолчанию при создании экземпляра используется `process.env.TOKEN` или` process.env.DISCORD_TOKEN`
      * <warn> Это всегда должно быть конфиденциально. </warn>
      * @type {?string}
      */
      this.token = process.env.TOKEN;
    };

    /**
     * Время, затраченное ботом на начало загрузки файлов до первого состояния «ГОТОВ».
     * @type {?Number}
     */
    this.bootTime = null;

    /**
     * Командный менеджер клиента
     * @type {CommandManager}
     */
    this.commands = new CommandManager(this);

    /**
     * Коллекции клиента
     * @type {Collections}
     */
    this.collections = new Collections();

    /**
     * Менеджер профилей гильдии клиента
     * @type {GuildProfilesManager}
     */
    this.guildProfiles = new GuildProfilesManager(this);

    /**
     * Менеджер голосования клиента
     * @type {Vote Manager}
     */
    // this.votes = new VoteManager(this);

    /**
     * Все изображения, используемые ботом с помощью команд на основе изображений.
     * @type {ImageManager}
     */
    this.images = new ImageManager();

    /**
     * Специальная музыкальная система для Hu Tao.
     * @type {MusicPlayer}
     */
    this.musicPlayer = new Music(this);

    /**
     * Внешняя база данных, подключенная к этому боту (значение null при отключении);
     * @type {?Mongoose}
    */
    this.database = null;

    if (settings.database?.enable === true){
      this.database = new Mongoose(this, settings.database);
    } else {
      // Do nothing..
    };

    /**
     * Счетчик сообщений, полученных и отправленных ботом
     * @type {?MessageCount}
     */
    this.messages = { received: 0, sent: 0 };

    /**
     * Предустановленные конфигурации ботов.
     * @type {ClientConfig}
     */
    this.config = {
      prefix: settings.prefix || 'f!',
      features: [],
      owners: [],
      channels: { debug: null, uploads: null, logs: null },
      websites: settings.websites
    };

    /**
     * ID канала, используемый ботом для регистрации ошибок при включении.
     * @type {?Snowflake}
     */
    if (typeof settings.channels?.debug === 'string'){
      this.config.channels.debug = settings.channels.debug;
    } else {
      // Do nothing...
    };

    /**
     * ID канала, используемый ботом для отправки сообщений голосования
     * @type {?Snowflake}
     */
    if (typeof settings.channels?.votes === 'string'){
      this.config.channels.votes = settings.channels.votes;
    } else {
      // Do nothing...
    };

    /**
     * ID канала, используемый ботом для загрузки файлов для некоторых команд, требующих загрузки..
     * @type {?Snowflake}
     */
    if (typeof settings.channels?.uploads === 'string'){
      this.config.channels.uploads = settings.channels.uploads;
    } else {
      // Do nothing...
    };

    if (typeof settings.channels?.logs === 'string'){
      this.config.channels.logs = settings.channels.logs;
    } else {
      // Do nothing...
    };

    /**
     * Массив ID {@link User}, которые будут учтены ботом-владельцем.
     * Будет использоваться {@link CommandHandler} при попытке чтения команд ownerOnly.
     * @type {?string[]}
     */
    if (Array.isArray(settings.owners)){
      if (settings.owners.length){
        this.config.owners = settings.owners;
      } else {
        // Do nothing
      };
    } else {
      // Do nothing
    };

    /**
     * Массив функций, разрешенных для этого экземпляра бота.
     * @type {?array}
     */
    if (Array.isArray(settings.allowedFeatures)){
      if (settings.allowedFeatures.length){
        this.config.features = settings.allowedFeatures;
      } else {
        // Do nothing
      };
    } else {
      // Do nothing
    };

    /**
     * Аниме-планировщик для бота.
     * @type {?Anischedule}
     */
    this.anischedule = new Anischedule(this);

    /**
     * Менеджер пингов, за которыми следил бот.
     * @type {PingManager}
     */
    this.pings = new PingManager(this, settings.monitorPings);

    /**
     * Логи для этого бота.
     * @type {array}
     */
    this.logs = [];

    // Выполните эти внутренние функции, как только бот будет готов!!
    this.once('ready', () => {
      this.bootTime = Math.round(performance.now());
      // this.votes.init({dbl: 900000,top:900000});
      this.guildProfiles.load();
      return;
    });

    // Выполните эти внутренние функции, как только база данных установит соединение!!
    this.database?.db.connection.once('connected', () => {
      this.anischedule.init();
      return;
    });

    // увеличивайте количество сообщений всякий раз, когда этот клиент выдает событие сообщения
    this.on('message', message => {
      if (message.author.id === this.user.id){
        return this.messages.sent++;
      } else {
        return this.messages.received++;
      };
    });
  };

  /**
   * Массовое добавление коллекций в менеджер коллекций
   * @param {...CollectionName} string Имя добавляемых коллекций
   * @returns {HutaoClient}
   */
  defineCollections(collection = []){
    if (!Array.isArray(collection)){
      throw new TypeError(`Client#defineCollections parameter expected type Array, received ${typeof collection}`);
    };

    for (const col of collection){
      this.collections.add(col);
    };

    return this;
  };

  /**
   * Прикрепите прослушиватель для событий процесса.
   * @param {...string} event Имя события процесса для прослушивания
   * @param {ProcessEventConfig} config Конфигурация для событий процесса.
   * @returns {void}
   */
  listentoProcessEvents(events = [], config = {}){
    if (!Array.isArray(events)){
      return;
    };

    if (typeof config !== 'object'){
      config = {};
    };

    for (const event of events){
      process.on(event, (...args) => {
        if (config.ignore && typeof config.ignore === 'boolean'){
          return;
        } else {
          return processEvents(event, args, this);
        };
      });
    };
  };

  /**
   * Загрузить командные файлы в этот экземпляр клиента.
   * @param {LoadCommandSettings} settings Настройки загрузки команд
   * @returns {void}
   */
  loadCommands(settings = {}){

    let log = true;
    const bypass = Boolean(settings.bypass);

    if (typeof settings.log === 'boolean'){
      log = settings.log;
    };

    function check(){
      if (!bypass){ process.exit(); } else { return true; };
    };

    if (typeof settings.parent !== 'string'){
      if (log) consoleUtil.warn('Родительская папка команды не задана, выполняется возврат к каталогу по умолчанию \'commands\'', '[BOT WARN]');
      settings.parent = 'commands';
    };

    this.commands.parent = settings.parent;

    if (!settings.paths?.length){
      settings['paths'] = ['']
    };

    if (!Array.isArray(settings.paths)){
      if (log) { consoleUtil.error(`INVALID_COMMAND_PATH: Нет путей для загрузки команд.`, 'path'); };
      if (check()) return;
    };

    if (!(this.commands instanceof CommandManager)){
      this.commands = new CommandManager({ groups: settings.groups });
    };

    for (let dir of settings.paths){
      if (Array.isArray(dir)){
        dir = join(...dir);
      };

      let files = null;

      try {
        files = readdirSync(join(process.cwd(), settings.parent, dir))
        .filter(f => f.split('.').pop() === 'js');
      } catch {
        if (log){
          consoleUtil.error(`DIR_NOT_FOUND: Не удается разрешить путь '${join(process.cwd(), settings.parent, dir)}'`, 'dir');
        };
        if (check()) continue;
      };

      for (const file of files){
        this.commands.add(require(join(process.cwd(), settings.parent, dir, file)), { log, bypass });
      };
    };

    if (log){
      consoleUtil.success(`Загружено ${this.commands.size} commands!`)
    };
  };

  /**
   * Загрузить файлы событий в этот клиентский экземпляр
   * @param {LoadEventSettings} settings Настройки загрузки событий
   * @returns {void}
   */
  loadEvents(settings = {}){

    const log = settings.log && typeof settings.log === 'boolean';
    const bypass = settings.bypass && typeof settings.bypass === 'boolean';

    function check(){
      if (!bypass){ process.exit(); } else { return true; };
    };

    if (typeof settings.parent !== 'string'){
      if (log){
         consoleUtil.warn('Родительская папка событий не задана, выполняется возврат в каталог по умолчанию \'events\'');
      } else {
        // Do nothing...
      };
      settings.parent = 'events';
    };

    let files = null;

    try {
      files = readdirSync(join(process.cwd(), settings.parent)).filter(f => f.split('.').pop() === 'js');
    } catch {
      if (log) {
        consoleUtil.error(`DIR_NOT_FOUND: Не удается разрешить путь '${join(process.cwd(),settings.parent)}'`, 'dir');
      } else {
        // Do nothing...
      };
      if (check()) { return; };
    };

    for (const event of files){
      this.on(event.split('.')[0], require(join(process.cwd(), settings.parent, event)).bind(null, this));
    };

    if (log){
      consoleUtil.success(`Загруженные ${files.length} event файлы!`)
    };
  };

  /**
  * Executes a function once and then loops it
  * @param {function} function The function to execute
  * @param {number} delay The delay between each execution
  * @param {params} parameter Additional parameters for the Interval function
  * @returns {Timeout} timeout returns a Timeout object
  */
  loop(fn, delay, ...param){
    fn();
    return setInterval(fn, delay, ...param);
  };

  /**
  * get logs
  * @returns {string<logs>} logged messages for this bot
  */
  getlogs(){
    return this.logs.join('\n') || 'Журналы в настоящее время пусты!'
  };

  /**
   * The prefix this client instance has been using
   * @type {ClientPrefix}
   * @readonly
   */
  get prefix(){
    return this.config.prefix;
  };

  /**
   * The features this client instance has access to
   * @type {ClientFeatures[]}
   * @readonly
   */
  get features(){
    return this.config.features;
  };

  /**
   * The owners of this bot
   * @type {ClientOwners[]}
   * @readonly
   */
  get owners(){
    return this.config.owners;
  };

  /**
   * The version of this app and the library its been using
   * @type {Version{}}
   * @readonly
   */
  get version(){
    return {
      library: version,
      client: require(`${process.cwd()}/package.json`).version
    };
  };
};
