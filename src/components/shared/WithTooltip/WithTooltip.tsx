import * as React from 'react'
import * as styles from './WithTooltip.css'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import * as classNames from 'classnames'
import { Static } from '~types'
import * as staticUrl from '~utils/staticUrl'

declare global {
  namespace JSX {
    interface IntrinsicElements {
        stats: any
    }
  }
}

const createMarkup = (thing: string) => { return { __html: thing } }

interface ItemTooltipProps {
  item: Static.Item,
  version: string
}

export const ItemTooltip = withStyles<ItemTooltipProps>(styles)(
  ({ item, version }: ItemTooltipProps) =>(
    <div className={styles.item}>
      <div className={styles.head}>
        <img src={staticUrl.item(item.id, version)} />
        <h1>{item.name}</h1>
      </div>
      <p>{item.plaintext}</p>
      <div className={styles.desc} dangerouslySetInnerHTML={createMarkup(item.description.raw)} />
      <b className={styles.cost}>cost: {item.gold.total}</b>
    </div>
  )
)

interface SkillTooltipProps {
  spell: Static.Spell,
  version: string
}

export const SpellTooltip = withStyles<SkillTooltipProps>(styles)(
  ({ spell, version }: SkillTooltipProps) => (
    <div className={styles.item}>
      <div className={styles.head}>
        <img src={staticUrl.spell(spell.id, version)} />
        <h1>{spell.name}</h1>
      </div>
      <div className={styles.desc} dangerouslySetInnerHTML={createMarkup(spell.description.raw)} />
      <b className={styles.cost}>cooldown: {spell.cooldownBurn} <br /> range: {spell.rangeBurn}</b>
    </div>
  )
)

interface MasteryTooltipProps {
  mastery: Static.Mastery,
  version: string
}

export const MasteryTooltip = withStyles<MasteryTooltipProps>(styles)(
  ({ mastery, version }: MasteryTooltipProps) => (
    <div className={styles.item}>
      <div className={styles.head}>
        <img src={staticUrl.mastery(mastery.id, version)} />
        <h1>{mastery.name}</h1>
      </div>
      <div className={styles.desc} dangerouslySetInnerHTML={createMarkup(mastery.description.slice(-1)[0].raw)} />
    </div>
  )
)

interface SkillTooltipProps {
  skill: Static.Skill,
  version: string
}

const parseDescription = (raw: string, effects: string[], vars: Static.SkillVar[]) => {
  let parsed = raw
  effects.map((x, i) =>
    parsed = parsed.split(`{{ e${i} }}`).join(effects[i]),
  )
  vars.map(x =>
    parsed = parsed.split(`{{ ${x.key} }}`).join(x.coeff[0].toString()),
  )
  const regexp = /\{\{ [a-z][0-9] \}\}/
  if (parsed.match(regexp)) { parsed += '<br/><stats>* ? denotes an unknown value due to riot API *</stats><br/>' }
  parsed = parsed.replace(regexp, '?')
  return parsed
}

export const SkillTooltip = withStyles<SkillTooltipProps>(styles)(
  ({ skill, version }: SkillTooltipProps) => (
    <div className={styles.item}>
      <div className={styles.head}>
        <img src={staticUrl.skill(skill.id, version)} />
        <h1>{skill.name}</h1>
      </div>
      <p>
        <stats>cost: {skill.costBurn}</stats>
        <br />
        <stats>cooldown: {skill.cooldownBurn}</stats>
        <br />
        <stats>range: {skill.rangeBurn}</stats>
      </p>
      <p><i dangerouslySetInnerHTML={createMarkup(skill.description.raw)} /></p>
      <div className={styles.desc} dangerouslySetInnerHTML={createMarkup(
        parseDescription(skill.tooltip.raw, skill.effectBurn, skill.vars))}
      />
    </div>
  )
)

// pure component to avoid unnecessary rerenders ?

interface Props {
  tooltip: any
}

interface State {
  x: number,
  y: number,
  flipX: boolean,
  flipY: boolean,
  hidden: boolean,
}

class WithTooltip extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      x: 0,
      y: 0,
      flipX: false,
      flipY: false,
      hidden: true,
    }
  }

  onMouseMove = (e: MouseEvent) =>  {
    const { clientX: x, clientY: y } = e
    const { innerWidth, innerHeight } = window
    const flipX = innerWidth - x < 400; // TODO: not hardcoding width
    const flipY = innerHeight - y < 500; // TODO: not hardcoding width
    this.setState({ x, y, flipX, flipY, hidden: false })
  }

  onMouseOut = () => {
    this.setState({ hidden: true })
  }

  renderTooltip() {
    const { x, y, flipX, flipY } = this.state
    const tooltip = (typeof this.props.tooltip === 'string') ?
      <h1 className={styles.box}>{this.props.tooltip}</h1> : this.props.tooltip
    return (
      <div
        className={styles.tooltip}
        style={{
          display: 'block',
          top: `${y}px`,
          left: `${x}px`,
        }}
      >
        <div className={classNames({
          [styles.flipper]: true,
          x: flipX,
          y: flipY
        })}>
          {tooltip}
        </div>
      </div>
    )
  }

  render() {
    const { children } = this.props
    if (typeof children === 'function') {
      return children({
        tooltip: !this.state.hidden && this.renderTooltip(),
      })
    }
    return (
      <div className={styles.withTooltip} >
        {!this.state.hidden && this.renderTooltip()}
        {children}
      </div>
    )
  }
}

export default withStyles(styles)(WithTooltip)
