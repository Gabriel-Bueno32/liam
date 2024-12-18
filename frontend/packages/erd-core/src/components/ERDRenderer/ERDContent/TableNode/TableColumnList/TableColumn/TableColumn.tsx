import type {
  Cardinality as CardinalityType,
  Column,
} from '@liam-hq/db-structure'
import { DiamondFillIcon, DiamondIcon, KeyRound } from '@liam-hq/ui'
import { Handle, Position } from '@xyflow/react'
import clsx from 'clsx'
import type { FC } from 'react'
import { match } from 'ts-pattern'
import { Cardinality } from './Cardinality'
import { CardinalityNotation } from './CardinalityNotation'
import styles from './TableColumn.module.css'

type TableColumnProps = {
  column: Column
  handleId: string
  isHighlighted: boolean
  isSource: boolean
  targetCardinality?: CardinalityType | undefined
}

export const TableColumn: FC<TableColumnProps> = ({
  column,
  handleId,
  isHighlighted,
  isSource,
  targetCardinality,
}) => {
  return (
    <li key={column.name} className={styles.columnWrapper}>
      {column.primary && (
        <KeyRound
          width={16}
          height={16}
          className={styles.primaryKeyIcon}
          role="img"
          aria-label="Primary Key"
        />
      )}
      {!column.primary &&
        (column.notNull ? (
          <DiamondFillIcon
            width={16}
            height={16}
            className={styles.diamondIcon}
            role="img"
            aria-label="Not Null"
          />
        ) : (
          <DiamondIcon
            width={16}
            height={16}
            className={styles.diamondIcon}
            role="img"
            aria-label="Nullable"
          />
        ))}

      <span className={styles.columnNameWrapper}>
        <span className={styles.columnName}>{column.name}</span>
        <span className={styles.columnType}>{column.type}</span>
      </span>

      {isSource && (
        <>
          <Handle
            id={handleId}
            type="source"
            position={Position.Right}
            className={clsx([styles.handle])}
          />
          <Cardinality
            direction="right"
            cardinality="ONE_TO_ONE"
            isHighlighted={isHighlighted}
          />
          <CardinalityNotation
            direction="right"
            notation="1"
            isHighlighted={isHighlighted}
          />
        </>
      )}

      {targetCardinality && (
        <>
          <Handle
            id={handleId}
            type="target"
            position={Position.Left}
            className={clsx([styles.handle])}
          />
          {match(targetCardinality)
            .with('ONE_TO_ONE', () => (
              <>
                <Cardinality
                  direction="left"
                  cardinality="ONE_TO_ONE"
                  isHighlighted={isHighlighted}
                />
                <CardinalityNotation
                  direction="left"
                  notation="1"
                  isHighlighted={isHighlighted}
                />
              </>
            ))
            .with('ONE_TO_MANY', () => (
              <>
                <Cardinality
                  direction="left"
                  cardinality="ONE_TO_MANY"
                  isHighlighted={isHighlighted}
                />
                <CardinalityNotation
                  direction="left"
                  notation="n"
                  isHighlighted={isHighlighted}
                />
              </>
            ))
            .otherwise(() => null)}
        </>
      )}
    </li>
  )
}
