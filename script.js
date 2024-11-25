const { createApp, Events, Utils } = Veloxi

const MacOsDockPlugin = (context) => {
    let items
    let root
    context.subscribeToEvents((eventBus) => {
        eventBus.subscribeToEvent(Events.PointerMoveEvent, onMouseMove)
    })

    function onMouseMove(event) {
        if (!root.intersects(event.x, event.y)) {
            items.forEach((item) => {
                item.size.reset()
            })
            return
        }
        items.forEach((item) => {
            const progress = Utils.pointToViewProgress(
                { x: event.x, y: event.y },
                item,
                120
            )
            const scale = Utils.remap(progress, 0, 1, 1, 2)
            item.size.set({ width: 40 * scale, height: 40 * scale })
        })
    }

    context.setup(() => {
        root = context.getView('root')
        items = context.getViews('item')
        items.forEach((item) => {
            item.size.setAnimator('dynamic')
            item.origin.set({ x: 0.5, y: 1 })
        })
    })
}

MacOsDockPlugin.pluginName = 'MacOsDock'

const app = createApp()
app.addPlugin(MacOsDockPlugin)
app.run()