import React, { Fragment, useState } from "react"
import { styled } from "@mui/material/styles"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import Box from "@mui/material/Box"
import { Tree, TreeBranch } from "../types/types"

interface TreeItemProps {
    readonly id: string
    readonly onSelectCallback: (e: React.MouseEvent<HTMLElement>) => void
    readonly label: string
    readonly isSelected: boolean | undefined
    readonly children: ReadonlyArray<JSX.Element>
}

export interface RecursiveTreeProps {
    readonly listMeta: Tree
    readonly onSelectCallback: (value: TreeBranch) => void
}

const TreeItem = ({
    onSelectCallback,
    label,
    isSelected,
    children,
}: TreeItemProps) => {
    const [isOpen, toggleItemOpen] = useState<boolean | null>(null)
    const [selected, setSelected] = useState(isSelected)

    return (
      <div>
        <StyledTreeItem>
          {children.length > 0 && (
            <Box
              className="icon-container"
              onClick={() => toggleItemOpen(!isOpen)}
            >
            {isOpen ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            </Box>
          )}
          <StyledLabel
            className="label"
            onClick={(e: React.MouseEvent<HTMLElement>) =>{
              setSelected(!selected)
              onSelectCallback(e)
            }}
            style={{
              marginLeft: `${children.length === 0 ? "24px" : ""}`,
              background: `${selected ? "#d5d5d5" : ""}`
            }}
          >
            {label}
          </StyledLabel>
        </StyledTreeItem>
        <StyledTreeChildren>{isOpen && children}</StyledTreeChildren>
      </div>
    )
}

const RecursiveTree = ({ listMeta, onSelectCallback }: RecursiveTreeProps) => {
    const createTree = (branch: TreeBranch) => (
        <TreeItem
            id={branch.id}
            key={branch.id}
            onSelectCallback={(e: React.MouseEvent<HTMLElement>) => {
                onSelectCallback(branch)
                }}
            isSelected={branch.selected}
            label={branch.label}
        >
            {branch.branches?.map((branch: TreeBranch) => {
            return <Fragment key={branch.id}>{createTree(branch)}</Fragment>
            }) || []}
        </TreeItem>
        )

    return (
      <Box>
        {listMeta.map((branch: TreeBranch) => (
          <Box key={branch.id}>{createTree(branch)}</Box>
        ))}
      </Box>
    )
}

export default RecursiveTree

// styles

const StyledLabel = styled(Box)({
    height: "24px",
    "&:hover": {
      cursor: "pointer"
    }
})
const StyledTreeItem = styled(Box)({
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
})
const StyledTreeChildren = styled(Box)({
    paddingLeft: "10px"
})